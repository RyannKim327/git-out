function selectionSortNumbers(arr: number[]): number[] {
    const n = arr.length;

    // Outer loop: iterate through the array up to the second-to-last element
    // because the last element will automatically be in place after n-1 passes.
    for (let i = 0; i < n - 1; i++) {
        // Assume the current element is the minimum
        let minIndex = i;

        // Inner loop: find the smallest element in the unsorted part (from i+1 to end)
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // Update minIndex if a smaller element is found
            }
        }

        // If the minimum element found is not the one we started with (at index i),
        // then swap it into the correct position.
        if (minIndex !== i) {
            // ES6 destructuring assignment for a concise swap
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr; // The array is sorted in-place, but returning it is good practice
}

// --- Example Usage ---
const numbers = [64, 25, 12, 22, 11];
console.log("Original numbers:", numbers);
const sortedNumbers = selectionSortNumbers([...numbers]); // Use spread to avoid modifying original array directly for demo
console.log("Sorted numbers:", sortedNumbers); // Output: [11, 12, 22, 25, 64]

const emptyArray: number[] = [];
console.log("Sorted empty:", selectionSortNumbers(emptyArray)); // Output: []

const singleElementArray = [42];
console.log("Sorted single element:", selectionSortNumbers(singleElementArray)); // Output: [42]
/**
 * Type definition for a comparator function.
 * It should return:
 * - a negative number if a is less than b
 * - a positive number if a is greater than b
 * - zero if a and b are equal
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Implements the Selection Sort algorithm.
 * Sorts an array of any type T in-place using a provided comparator function.
 *
 * @param arr The array to be sorted.
 * @param comparator A function that compares two elements of type T.
 * @returns The sorted array (same array instance as input).
 */
function selectionSort<T>(arr: T[], comparator: Comparator<T>): T[] {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            // Use the comparator to determine if arr[j] is "less than" arr[minIndex]
            if (comparator(arr[j], arr[minIndex]) < 0) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
    return arr;
}

// --- Example Usage with Comparator ---

// 1. Sorting Numbers (ascending)
const numComparator: Comparator<number> = (a, b) => a - b;
const numbersGeneric = [64, 25, 12, 22, 11];
console.log("\nOriginal numbers (generic):", numbersGeneric);
const sortedNumbersGeneric = selectionSort([...numbersGeneric], numComparator);
console.log("Sorted numbers (generic):", sortedNumbersGeneric); // Output: [11, 12, 22, 25, 64]

// 2. Sorting Strings (alphabetical)
const stringComparator: Comparator<string> = (a, b) => a.localeCompare(b);
const words = ["banana", "apple", "cherry", "date"];
console.log("\nOriginal words:", words);
const sortedWords = selectionSort([...words], stringComparator);
console.log("Sorted words:", sortedWords); // Output: ["apple", "banana", "cherry", "date"]

// 3. Sorting Objects (by a property, e.g., age)
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 }, // Same age as Bob
];

const ageComparator: Comparator<Person> = (p1, p2) => p1.age - p2.age;

console.log("\nOriginal people:", people);
const sortedPeople = selectionSort([...people], ageComparator);
console.log("Sorted people by age:", sortedPeople);
/* Output:
[
  { name: 'Bob', age: 25 },
  { name: 'David', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 35 }
]
Notice that "Bob" and "David" might swap positions relative to their original order if they have the same age. This is because Selection Sort is not a "stable" sorting algorithm.
*/
