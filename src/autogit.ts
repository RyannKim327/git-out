const numbers: number[] = [5, 2, 9, 1, 5, 6];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 5, 6, 9]
const numbers: number[] = [5, 2, 9, 1, 5, 6];
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 6, 5, 5, 2, 1]
// ⚠️ Warning: This doesn't work correctly for numbers!
const numbers: number[] = [5, 2, 9, 1, 5, 6];
numbers.sort(); // Incorrect result: [1, 2, 5, 5, 6, 9] might work but is unreliable
const numbers: number[] = [5, 2, 9, 1, 5, 6];
const sortedNumbers = [...numbers].sort((a, b) => a - b);
console.log(sortedNumbers); // [1, 2, 5, 5, 6, 9]
console.log(numbers); // Original array unchanged: [5, 2, 9, 1, 5, 6]
interface NumberItem {
    value: number;
    priority: number;
}

const items: NumberItem[] = [
    { value: 5, priority: 2 },
    { value: 2, priority: 1 },
    { value: 9, priority: 3 }
];

// Sort by priority first, then by value
items.sort((a, b) => {
    if (a.priority !== b.priority) {
        return a.priority - b.priority;
    }
    return a.value - b.value;
});

console.log(items);
// [{ value: 2, priority: 1 }, { value: 5, priority: 2 }, { value: 9, priority: 3 }]
function sortNumbers<T extends number>(
    array: T[], 
    order: 'asc' | 'desc' = 'asc'
): T[] {
    return [...array].sort((a, b) => 
        order === 'asc' ? a - b : b - a
    );
}

const numbers = [5, 2, 9, 1, 5, 6];
const ascending = sortNumbers(numbers);
const descending = sortNumbers(numbers, 'desc');
// ❌ Wrong - converts numbers to strings for comparison
numbers.sort();

// ❌ Wrong - doesn't return a number
numbers.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    // missing return 0 for equal case
});

// ✅ Correct
numbers.sort((a, b) => a - b);
