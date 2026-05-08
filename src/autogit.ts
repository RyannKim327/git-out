const numbers = [12, -5, 7, 42, 3.9];

// 1️⃣ Spice it up with the spread operator (`Math.max`)
const maxUsingMath = Math.max(...numbers);
console.log('maxUsingMath →', maxUsingMath); // 42

// 2️⃣ Stack‑overflow‑safe – you don’t want to blow the argument limit
const maxUsingReduce = numbers.reduce((max, n) => (n > max ? n : max), -Infinity);
console.log('maxUsingReduce →', maxUsingReduce); // 42

// 3️⃣ Old‑school loop (great for huge arrays)
let maxOldSchool = -Infinity;
for (const n of numbers) {
  if (n > maxOldSchool) maxOldSchool = n;
}
console.log('maxOldSchool →', maxOldSchool); // 42
const bigNumbers = new Float64Array([1.5, 2.3, 0.0, 9.1]);
const maxFloat = Math.max(...bigNumbers); // works, but may still hit the limit
