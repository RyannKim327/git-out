const numbers: number[] = [3, 9, 2, 15, 7];

const max = Math.max(...numbers); // 15
console.log(max);
const max = numbers.length ? Math.max(...numbers) : undefined;
const max = numbers.reduce((best, n) => (n > best ? n : best), -Infinity);
