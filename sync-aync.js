console.log(`-----Sync-----`);
console.log(`1. `);
console.log(`2. `);
console.log(`3. `);

console.log(`-----Async-----`);
console.log(`1. `);
setTimeout(() => {
    console.log(`2. `)
}, 3000);
console.log(`3. `);

async function fetchData() {
    const res = await fetch ('https://jsonplaceholder.typicode.com/todos/1');

    console.log(await res.json());

}
fetchData();
