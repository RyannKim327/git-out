const numbers: number[] = [5, 2, 8, 1, 9, 3];

// Ascending order (default)
const ascending = [...numbers].sort((a, b) => a - b);
console.log(ascending); // [1, 2, 3, 5, 8, 9]

// Descending order
const descending = [...numbers].sort((a, b) => b - a);
console.log(descending); // [9, 8, 5, 3, 2, 1]
const numbers: number[] = [5, 2, 8, 1, 9, 3];

// Ascending with explicit typing
const ascending = numbers.sort((a: number, b: number): number => a - b);

// Descending with explicit typing
const descending = numbers.sort((a: number, b: number): number => b - a);
const originalNumbers: number[] = [5, 2, 8, 1, 9, 3];

// Create a new sorted array without modifying original
const sortedNumbers = [...originalNumbers].sort((a, b) => a - b);

console.log(originalNumbers); // [5, 2, 8, 1, 9, 3] (unchanged)
console.log(sortedNumbers);    // [1, 2, 3, 5, 8, 9]
type SortOrder = 'asc' | 'desc';

function sortNumbers(numbers: number[], order: SortOrder = 'asc'): number[] {
    return [...numbers].sort((a, b) => {
        return order === 'asc' ? a - b : b - a;
    });
}

const numbers: number[] = [5, 2, 8, 1, 9, 3];

console.log(sortNumbers(numbers));           // [1, 2, 3, 5, 8, 9]
console.log(sortNumbers(numbers, 'desc'));   // [9, 8, 5, 3, 2, 1]
function sortArray<T extends number>(
    arr: T[], 
    compareFn?: (a: T, b: T) => number
): T[] {
    return [...arr].sort(compareFn);
}

const numbers = [5, 2, 8, 1, 9, 3];
const sorted = sortArray(numbers, (a, b) => a - b);
function safeSortNumbers(numbers: number[]): number[] {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    
    if (numbers.length <= 1) {
        return [...numbers];
    }
    
    // Handle potential NaN values
    const validNumbers = numbers.filter(n => !isNaN(n));
    
    return [...validNumbers].sort((a, b) => a - b);
}
