import express from 'express';
import db from './db.js';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY || process.env.SECRET_Key || 'secret_key_2026';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied: No Token Provided'
            });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Access Denied: Invalid or Expired Token'
                });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Authentication error occurred',
            error: error.message
        });
    }
};

app.get('/', (req, res) => {
    res.json({ message: 'Backend is running' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'username and password are required' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);

        if (users.length === 0 || !(await compare(password, users[0].password))) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const payload = {
            id: users[0].id,
            username: users[0].username
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });

        res.json({ msg: 'login สำเร็จ', token, user: payload });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Login failed', error: error.message });
    }
});

app.post('/api/book', authenticateToken, async (req, res) => {
    const { title, author, published_year, price } = req.body;

    try {
        await db.query(
            'INSERT INTO books (title, author, published_year, price) VALUES (?, ?, ?, ?)',
            [title, author, published_year, price]
        );

        res.status(201).json({
            success: true,
            message: 'เพิ่มหนังสือสำเร็จ'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'เพิ่มหนังสือไม่สำเร็จ'
        });
    }
});

app.get('/api/book', authenticateToken, async (req, res) => {
    try {
        const [data] = await db.query('SELECT * FROM books ORDER BY id ASC');
        res.status(200).json({
            success: true,
            message: 'ดึงข้อมูลหนังสือสำเร็จ',
            data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'ดึงข้อมูลหนังสือไม่สำเร็จ'
        });
    }
});

app.put('/api/book/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, author, published_year, price } = req.body;

    try {
        await db.query(
            'UPDATE books SET title = ?, author = ?, published_year = ?, price = ? WHERE id = ?',
            [title, author, published_year, price, id]
        );

        res.status(200).json({
            success: true,
            message: 'แก้ไขหนังสือสำเร็จ'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'แก้ไขหนังสือไม่สำเร็จ'
        });
    }
});

app.delete('/api/book/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('DELETE FROM books WHERE id = ?', [id]);

        res.status(200).json({
            success: true,
            message: 'ลบหนังสือสำเร็จ'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'ลบหนังสือไม่สำเร็จ'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server ทำงานที่ http://localhost:${PORT}`);
});
