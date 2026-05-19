const numbers: number[] = [42, 23, 8, 15, 16];

// Ascending (smallest → largest)
const asc = [...numbers].sort((a, b) => a - b);
console.log('Ascending:', asc); // [8, 15, 16, 23, 42]

// Descending (largest → smallest)
const desc = [...numbers].sort((a, b) => b - a);
console.log('Descending:', desc); // [42, 23, 16, 15, 8]
function sortNumbers(arr: number[], ascending = true): number[] {
  return [...arr].sort((a, b) => ascending ? a - b : b - a);
}

console.log(sortNumbers(numbers));      // Ascending
console.log(sortNumbers(numbers, false)); // Descending
