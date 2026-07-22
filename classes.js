class Book {
    constructor(title, price, stock) {
        this.title = title;
        this.title = price;
        this.title = stock;
    }

    getDiscountPrice() {
        return this.price * 0.9;
    }

    sell(quantity) {
        if (this.stock >= quantity) {
            this.stock -= quantity;
            console.log(`ขายหนังสือ"${this.title}" สำเร็จ! สต๊อกคงเหลือ: ${this.stock} เล่ม`);
        } else {
            console.log(`❌ หนังสือ "${this.titlr}" มีสต๊อกไม่พอขาย!`)
        }
    }
}
    const book1 = new Book("JavaScript Basic", 300, 15);
    const book2 = new Book("JavaScript Design", 250, 8);

    console.log(`ราคาหลังหักส่วนลดเล่มที่ 1`)
