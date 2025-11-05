const numbers: number[] = [3, 7, 2, 9, 5];
const max = Math.max(...numbers);
console.log(max); // 9
const max = numbers.length > 0 ? Math.max(...numbers) : undefined;
const max = numbers.reduce((m, v) => (v > m ? v : m), -Infinity);
