function quicksort<T>(arr: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Choose the first element as pivot
    const pivot = arr[0];
    const left: T[] = [];
    const right: T[] = [];

    // Partition the array
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursively sort sub-arrays and combine
    return [...quicksort(left), pivot, ...quicksort(right)];
}

// Example usage with numbers
const numbers: number[] = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", quicksort(numbers));

// Example usage with strings
const words: string[] = ["banana", "apple", "cherry", "date", "elderberry"];
console.log("Original:", words);
console.log("Sorted:", quicksort(words));
function quicksortInPlace<T>(arr: T[], low: number = 0, high: number = arr.length - 1): void {
    if (low < high) {
        const partitionIndex = partition(arr, low, high);
        quicksortInPlace(arr, low, partitionIndex - 1);
        quicksortInPlace(arr, partitionIndex + 1, high);
    }
}

function partition<T>(arr: T[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Usage
const arr = [64, 34, 25, 12, 22, 11, 90];
quicksortInPlace(arr);
console.log("Sorted in-place:", arr);
function quicksortWithComparator<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[0];
    const left: T[] = [];
    const right: T[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (comparator(arr[i], pivot) < 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quicksortWithComparator(left, comparator), 
            pivot, 
            ...quicksortWithComparator(right, comparator)];
}

// Example with objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

console.log("Sorted by age:", quicksortWithComparator(people, (a, b) => a.age - b.age));
console.log("Sorted by name:", quicksortWithComparator(people, (a, b) => a.name.localeCompare(b.name)));
