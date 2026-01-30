const numbers: number[] = [5, 2, 9, 1, 5, 6];

// sort in place (mutates the original array)
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 5, 6, 9]
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 6, 5, 5, 2, 1]
const sorted = [...numbers].sort((a, b) => a - b);
// or
const sorted = numbers.slice().sort((a, b) => a - b);
interface Item { value: number; rank: number }

const items: Item[] = [
  { value: 10, rank: 2 },
  { value: 12, rank: 1 },
  { value: 10, rank: 1 }
];

items.sort((x, y) => {
  if (x.value === y.value) return x.rank - y.rank; // tie‑break on rank
  return x.value - y.value;
});

console.log(items);
