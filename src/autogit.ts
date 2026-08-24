const numbers: number[] = [3, 1, 4, 1, 5, 9, 2];

// Numeric ascending sort
numbers.sort((a, b) => a - b);
console.log(numbers);   // [1, 1, 2, 3, 4, 5, 9]

// Numeric descending sort
numbers.sort((a, b) => b - a);
console.log(numbers);   // [9, 5, 4, 3, 2, 1, 1]
[10, 2, 33].sort();   // ["10", "2", "33"]  → [10, 2, 33] displayed as String array
const sorted = [...numbers].sort((a, b) => a - b);
numbers.sort((a, b) => {
  const absDiff = Math.abs(a) - Math.abs(b);
  return absDiff !== 0 ? absDiff : a - b;
});
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  for (const x of arr.slice(0, -1)) {
    (x < pivot ? left : right).push(x);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

const numbers2 = [3, 1, 4, 1, 5, 9, 2];
const sorted2 = quickSort(numbers2);
console.log(sorted2);   // [1, 1, 2, 3, 4, 5, 9]
