const numbers: number[] = [34, 7, 23, 32, 5, 62];

// Ascending order (smallest → largest)
const asc = [...numbers].sort((a, b) => a - b);
console.log('Ascending:', asc); // [5, 7, 23, 32, 34, 62]

// Descending order (largest → smallest)
const desc = [...numbers].sort((a, b) => b - a);
console.log('Descending:', desc); // [62, 34, 32, 23, 7, 5]
// Sort a copy without mutating the original array
const ascending = numbers.slice().sort((a, b) => a - b);

// Or, if you prefer a single‑line declaration:
const descending = [...numbers].sort((a, b) => b - a);
