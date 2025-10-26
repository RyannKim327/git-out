const numbers: number[] = [3, 7, 2, 9, 5];
const max = Math.max(...numbers);   // 9
const max = numbers.length ? Math.max(...numbers) : undefined; // or any fallback you prefer
