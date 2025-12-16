const numbers: number[] = [3, 9, 2, 42, 7];
const max = Math.max(...numbers);   // 42
console.log(max);
const maxSafe = numbers.length ? Math.max(...numbers) : undefined;
const max = numbers.reduce((best, n) => (n > best ? n : best), -Infinity);
