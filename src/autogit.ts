function selectionSort(arr: number[]): number[] {
    const n = arr.length;

    // Outer loop: Iterate through the array up to the second-to-last element
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i; // Assume the current element is the minimum

        // Inner loop: Find the minimum element in the unsorted part (from i+1 to end)
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // Update minIndex if a smaller element is found
            }
        }

        // If the minimum element found is not the current element, swap them
        if (minIndex !== i) {
            // ES6 destructuring swap for convenience
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr; // Return the sorted array (modified in place)
}

// --- Usage Example ---
const numbers = [64, 25, 12, 22, 11];
console.log("Original array:", numbers); // [64, 25, 12, 22, 11]

const sortedNumbers = selectionSort(numbers);
console.log("Sorted array:", sortedNumbers); // [11, 12, 22, 25, 64]

const anotherArray = [5, 4, 3, 2, 1, 0];
console.log("Original array:", anotherArray);
selectionSort(anotherArray);
console.log("Sorted array:", anotherArray); // [0, 1, 2, 3, 4, 5]
type Comparator<T> = (a: T, b: T) => number;

function selectionSortGeneric<T>(
    arr: T[],
    // Default comparator for numbers/primitives that can be subtracted
    comparator: Comparator<T> = (a, b) => (a as any) - (b as any)
): T[] {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            // Use the provided comparator function
            if (comparator(arr[j], arr[minIndex]) < 0) { // arr[j] is "less than" arr[minIndex]
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

// --- Usage Examples with Generic Version ---

// 1. Sorting Numbers (using default comparator)
const genericNumbers = [64, 25, 12, 22, 11];
console.log("\nOriginal generic numbers:", genericNumbers);
selectionSortGeneric(genericNumbers);
console.log("Sorted generic numbers:", genericNumbers); // [11, 12, 22, 25, 64]

// 2. Sorting Strings
const fruits = ["banana", "apple", "cherry", "date"];
console.log("\nOriginal fruits:", fruits);
selectionSortGeneric(fruits, (a, b) => a.localeCompare(b)); // Use string's localeCompare
console.log("Sorted fruits:", fruits); // ["apple", "banana", "cherry", "date"]

// 3. Sorting Objects by a property (e.g., age)
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 } // Example with same age
];

console.log("\nOriginal people:", people);

// Sort by age
selectionSortGeneric(people, (a, b) => a.age - b.age);
console.log("Sorted people by age:", people);
// Expected: [{ name: "Bob", age: 25 }, { name: "David", age: 25 }, { name: "Alice", age: 30 }, { name: "Charlie", age: 35 }]
// Note: Relative order of Bob/David (same age) is not guaranteed to be stable.

// Sort by name (after sorting by age)
selectionSortGeneric(people, (a, b) => a.name.localeCompare(b.name));
console.log("Sorted people by name:", people);
// Expected: [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 }, { name: "David", age: 25 }]
