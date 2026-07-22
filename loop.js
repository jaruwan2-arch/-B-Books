/**
 * while
 * do while
 * for
 

for (let index = 0; index < 5; index++) {
    console.log(index);

}
while (index < 5) {

}
do {

} while (index < 5);
// forEach */

const books = [
    {title : "หนังสือ 01", price : 300},
    {title : "หนังสือ 02", price : 350},
    {title : "หนังสือ 03", price : 200},
];
books . forEach((e,index)=> {
    console.log(`ลำดับ ${index} ชื่อ : ${e.title} ราคา : ${e.price}`);
});

const newBooks = books.map(book => {
    return {
        ...book,
        discount: book.price = book.price * 0.9
    }
})
console.log(newBooks);