const numbers: number[] = [5, 2, 9, 1, 5, 6];
const sortedNumbers = numbers.sort((a, b) => a - b);
console.log(sortedNumbers); // [1, 2, 5, 5, 6, 9]
const numbers: number[] = [5, 2, 9, 1, 5, 6];
const sortedNumbers = numbers.sort((a, b) => b - a);
console.log(sortedNumbers); // [9, 6, 5, 5, 2, 1]
// Ascending
const ascSorted = [...numbers].sort(); // Spread operator copies array first

// Descending
const descSorted = [...numbers].sort().reverse();
function sortNumbers(arr: number[], order: 'asc' | 'desc' = 'asc'): number[] {
  const sorted = [...arr].sort((a, b) => a - b);
  return order === 'desc' ? sorted.reverse() : sorted;
}

// Usage
const numbers = [3, 1, 4, 1, 5, 9, 2];
const ascending = sortNumbers(numbers); // [1, 1, 2, 3, 4, 5, 9]
const descending = sortNumbers(numbers, 'desc'); // [9, 5, 4, 3, 2, 1, 1]
const numbers: number[] = [5, 2, 9, 1, 5, 6];

// Create a sorted copy without modifying original
const sortedCopy = [...numbers].sort((a, b) => a - b);

console.log(numbers); // [5, 2, 9, 1, 5, 6] (unchanged)
console.log(sortedCopy); // [1, 2, 5, 5, 6, 9]
interface CustomSortOptions {
  order: 'asc' | 'desc';
  priority?: number[]; // Example of custom priority
}

function customSort(arr: number[], options: CustomSortOptions): number[] {
  return [...arr].sort((a, b) => {
    if (options.priority?.includes(a) && !options.priority.includes(b)) {
      return -1;
    }
    if (options.priority?.includes(b) && !options.priority.includes(a)) {
      return 1;
    }
    return options.order === 'asc' ? a - b : b - a;
  });
}

// Usage
const numbers = [3, 1, 4, 1, 5, 9, 2];
const result = customSort(numbers, { order: 'asc', priority: [9, 5] });
