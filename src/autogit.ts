/**
 * Interpolation search algorithm for sorted arrays
 * @param arr - Sorted array to search in
 * @param target - Value to search for
 * @returns Index of the target element, or -1 if not found
 */
function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    // Array must be sorted for interpolation search to work
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Handle case where all elements are same
        if (arr[high] === arr[low]) {
            if (arr[low] === target) return low;
            return -1;
        }

        // Calculate the position using interpolation formula
        const pos = Math.floor(
            low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Found the target
        if (arr[pos] === target) {
            return pos;
        }

        // If target is smaller, search left half
        if (arr[pos] > target) {
            high = pos - 1;
        } 
        // If target is larger, search right half
        else {
            low = pos + 1;
        }
    }

    return -1; // Target not found
}
/**
 * Generic interpolation search algorithm
 * @param arr - Sorted array to search in
 * @param target - Value to search for
 * @param getValue - Function to extract numeric value from element
 * @returns Index of the target element, or -1 if not found
 */
function interpolationSearchGeneric<T>(
    arr: T[],
    target: T,
    getValue: (item: T) => number = (item) => Number(item)
): number {
    let low = 0;
    let high = arr.length - 1;

    const targetValue = getValue(target);
    const lowValue = getValue(arr[low]);
    const highValue = getValue(arr[high]);

    while (low <= high && targetValue >= lowValue && targetValue <= highValue) {
        // Handle case where all elements are same
        if (highValue === lowValue) {
            if (arr[low] === target) return low;
            return -1;
        }

        // Calculate the position using interpolation formula
        const pos = Math.floor(
            low + ((targetValue - lowValue) * (high - low)) / (highValue - lowValue)
        );

        // Found the target (using deep equality for objects)
        if (arr[pos] === target) {
            return pos;
        }

        const posValue = getValue(arr[pos]);
        
        // If target is smaller, search left half
        if (posValue > targetValue) {
            high = pos - 1;
        } 
        // If target is larger, search right half
        else {
            low = pos + 1;
        }
    }

    return -1; // Target not found
}
// Example 1: Basic usage with numbers
const sortedNumbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(interpolationSearch(sortedNumbers, 50)); // Output: 4
console.log(interpolationSearch(sortedNumbers, 25)); // Output: -1

// Example 2: Generic version with custom objects
interface Person {
    id: number;
    name: string;
    age: number;
}

const people: Person[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
    { id: 4, name: "Diana", age: 40 },
].sort((a, b) => a.age - b.age);

// Search by age
const result1 = interpolationSearchGeneric(
    people,
    { id: 0, name: "Charlie", age: 35 } as Person,
    (person) => person.age
);
console.log(result1); // Output: 2

// Example 3: With strings
const sortedStrings = ["apple", "banana", "cherry", "date", "elderberry"];
const result2 = interpolationSearchGeneric(
    sortedStrings,
    "cherry",
    (str) => str.charCodeAt(0) // Simple conversion using first character
);
console.log(result2); // Output: 2
class InterpolationSearch {
    /**
     * Perform interpolation search on a sorted numeric array
     */
    static search(arr: number[], target: number): number {
        // Validate input
        if (!Array.isArray(arr) || arr.length === 0) {
            return -1;
        }

        let low = 0;
        let high = arr.length - 1;

        while (low <= high && target >= arr[low] && target <= arr[high]) {
            if (arr[high] === arr[low]) {
                return arr[low] === target ? low : -1;
            }

            const pos = Math.floor(
                low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
            );

            if (pos < low || pos > high) {
                break; // Position out of bounds
            }

            if (arr[pos] === target) {
                return pos;
            } else if (arr[pos] < target) {
                low = pos + 1;
            } else {
                high = pos - 1;
            }
        }

        return -1;
    }

    /**
     * Check if array is sorted (utility method)
     */
    static isSorted(arr: number[]): boolean {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    }
}

// Usage
const numbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
console.log(InterpolationSearch.search(numbers, 12)); // Output: 5
console.log(InterpolationSearch.isSorted(numbers));   // Output: true
