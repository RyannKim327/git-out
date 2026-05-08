const numbers: number[] = [12, 7, 9, 4, 18, 1];

// The default Array.prototype.sort() compares elements as strings,
// so for numeric sorting you need a comparison function.
numbers.sort((a, b) => a - b);

console.log(numbers); // [1, 4, 7, 9, 12, 18]
const sorted = [...numbers].sort((a, b) => a - b);
