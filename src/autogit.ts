function selectionSortNumbers(arr: number[]): void {
    const n = arr.length;

    // One by one move boundary of unsorted subarray
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in the remaining unsorted array
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element of the unsorted part
        // Only swap if the minimum element is not already in its correct position
        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

// Example Usage:
const numbers = [64, 25, 12, 22, 11];
console.log("Original numbers:", numbers);
selectionSortNumbers(numbers);
console.log("Sorted numbers:", numbers); // Output: [11, 12, 22, 25, 64]

const emptyArray: number[] = [];
selectionSortNumbers(emptyArray);
console.log("Sorted empty array:", emptyArray); // Output: []

const singleElementArray = [7];
selectionSortNumbers(singleElementArray);
console.log("Sorted single element array:", singleElementArray); // Output: [7]

const alreadySorted = [1, 2, 3, 4, 5];
selectionSortNumbers(alreadySorted);
console.log("Already sorted array:", alreadySorted); // Output: [1, 2, 3, 4, 5]
// Helper function for swapping elements (optional, but good practice)
function swap<T>(arr: T[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Default comparator for primitive types (numbers, strings)
// This will work for types that support '<' and '>' operators
const defaultComparator = <T>(a: T, b: T): number => {
    if (a < b) return -1; // a comes before b
    if (a > b) return 1;  // a comes after b
    return 0;             // a and b are equal
};

function selectionSort<T>(
    arr: T[],
    comparator: (a: T, b: T) => number = defaultComparator
): void {
    const n = arr.length;

    // One by one move boundary of unsorted subarray
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element's index in the remaining unsorted array
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            // Use the comparator function to determine order
            if (comparator(arr[j], arr[minIndex]) < 0) { // if arr[j] is "less than" arr[minIndex]
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element of the unsorted part
        // Only swap if the minimum element is not already in its correct position
        if (minIndex !== i) {
            swap(arr, i, minIndex);
        }
    }
}

// --- Example Usage with Generic Version ---

// 1. Numbers (using default comparator)
const genericNumbers = [64, 25, 12, 22, 11];
console.log("\nOriginal generic numbers:", genericNumbers);
selectionSort(genericNumbers);
console.log("Sorted generic numbers:", genericNumbers); // Output: [11, 12, 22, 25, 64]

// 2. Strings (using default comparator)
const strings = ["banana", "apple", "cherry", "date"];
console.log("\nOriginal strings:", strings);
selectionSort(strings);
console.log("Sorted strings:", strings); // Output: ["apple", "banana", "cherry", "date"]

// 3. Custom Objects (requiring a specific comparator)
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
];

// Comparator to sort by age in ascending order
const sortByAgeAsc = (a: Person, b: Person): number => a.age - b.age;

console.log("\nOriginal people:", people);
selectionSort(people, sortByAgeAsc);
console.log("Sorted people by age (asc):", people);
/* Output:
[
  { name: 'Bob', age: 25 },
  { name: 'David', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 35 }
]
*/

// Comparator to sort by name in descending order
const sortByNameDesc = (a: Person, b: Person): number => {
    if (a.name > b.name) return -1; // b comes before a
    if (a.name < b.name) return 1;  // b comes after a
    return 0;
};

const people2: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
];
console.log("\nOriginal people2:", people2);
selectionSort(people2, sortByNameDesc);
console.log("Sorted people2 by name (desc):", people2);
/* Output:
[
  { name: 'David', age: 25 },
  { name: 'Charlie', age: 35 },
  { name: 'Bob', age: 25 },
  { name: 'Alice', age: 30 }
]
*/
