// -------------------------------------------------
// 1️⃣  Simple numeric sort (ascending)
// -------------------------------------------------
const numbers: number[] = [42, 7, 19, 3, 100, -5];

numbers.sort((a, b) => a - b);   // → [-5, 3, 7, 19, 42, 100]

console.log(numbers);
numbers.sort((a, b) => b - a);   // → [100, 42, 19, 7, 3, -5]
const original = [5, 2, 9, 1];

const sortedAsc = [...original].sort((a, b) => a - b);
const sortedDesc = [...original].sort((a, b) => b - a);

console.log(original);   // [5, 2, 9, 1]  (unchanged)
console.log(sortedAsc);  // [1, 2, 5, 9]
console.log(sortedDesc); // [9, 5, 2, 1]
/**
 * Returns a **new** array sorted numerically.
 *
 * @param arr   The source array (will not be mutated)
 * @param asc   `true` for ascending, `false` for descending (default: true)
 * @returns     A new sorted array
 */
function sortNumbers<T extends number>(arr: readonly T[], asc: boolean = true): T[] {
  const copy = [...arr];                     // shallow copy (preserves immutability)
  copy.sort((a, b) => (asc ? a - b : b - a));
  return copy;
}

// Usage
const data = [12, -3, 7, 0];
const ascSorted  = sortNumbers(data);          // [ -3, 0, 7, 12 ]
const descSorted = sortNumbers(data, false);   // [ 12, 7, 0, -3 ]

console.log({ data, ascSorted, descSorted });
function sortInPlace(nums: number[], asc = true): void {
  nums.sort((a, b) => (asc ? a - b : b - a));
}

// Example
const big = Array.from({ length: 1_000_000 }, () => Math.floor(Math.random() * 1_000_000));
console.time('in‑place sort');
sortInPlace(big);
console.timeEnd('in‑place sort');   // ~50‑150 ms on a modern laptop
type NumericArray = number[];

function sortNumericArray(arr: NumericArray, asc = true): NumericArray {
  // The cast is safe because we know `arr` is `number[]`
  return [...arr].sort((a, b) => (asc ? a - b : b - a));
}
import React, { useState } from "react";

function NumberSorter() {
  const [input, setInput] = useState("5,2,9,1");
  const numbers = input
    .split(",")
    .map(s => Number(s.trim()))
    .filter(n => !Number.isNaN(n));

  const sortedAsc = [...numbers].sort((a, b) => a - b);
  const sortedDesc = [...numbers].sort((a, b) => b - a);

  return (
    <div>
      <h2>Enter comma‑separated integers</h2>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <p>Original: {numbers.join(", ")}</p>
      <p>Ascending: {sortedAsc.join(", ")}</p>
      <p>Descending: {sortedDesc.join(", ")}</p>
    </div>
  );
}
