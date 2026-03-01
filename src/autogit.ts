// 1️⃣  Define the array (TypeScript knows it’s numbers)
const nums: number[] = [42, 7, 13, 99, 29];

// 2️⃣  Sort in place – ascending
nums.sort((a, b) => a - b);   // -> [7, 13, 29, 42, 99]
console.log('Ascending:', nums);

// 3️⃣  If you want a new sorted array instead, copy first
const ascending = [...nums].sort((a, b) => a - b);

// 4️⃣  Descending order
const descending = nums.slice().sort((a, b) => b - a); // -> [99, 42, 29, 13, 7]
console.log('Descending:', descending);
