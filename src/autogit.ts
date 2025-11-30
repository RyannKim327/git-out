/**
 * Swaps two elements in an array.
 * @param arr The array.
 * @param i Index of the first element.
 * @param j Index of the second element.
 */
function swap<T>(arr: T[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * Partitions the array around a pivot element.
 * Elements smaller than the pivot are moved to its left,
 * and elements greater than the pivot are moved to its right.
 * The pivot element is placed in its final sorted position.
 *
 * @param arr The array to partition.
 * @param low The starting index of the sub-array to partition.
 * @param high The ending index of the sub-array to partition (the pivot index).
 * @returns The final index of the pivot element.
 */
function partition<T>(arr: T[], low: number, high: number): number {
    const pivot = arr[high]; // Choose the last element as the pivot
    let i = low - 1; // Index of the smaller element, indicating the boundary for elements <= pivot

    // Iterate through the sub-array from low to high-1
    for (let j = low; j < high; j++) {
        // If the current element is smaller than or equal to the pivot
        if (arr[j] <= pivot) {
            i++; // Increment index of smaller element
            swap(arr, i, j); // Swap current element with the element at 'i'
        }
    }

    // After the loop, all elements less than or equal to the pivot are on the left of 'i'.
    // Place the pivot element in its correct sorted position by swapping it with arr[i + 1].
    swap(arr, i + 1, high);
    return i + 1; // Return the partitioning index (the final position of the pivot)
}

/**
 * The main Quicksort recursive function.
 * Sorts a sub-array in place using the Quicksort algorithm.
 *
 * @param arr The array to sort.
 * @param low The starting index of the sub-array.
 * @param high The ending index of the sub-array.
 */
function quicksortRecursive<T>(arr: T[], low: number, high: number): void {
    // Base case: If the sub-array has 0 or 1 element, it's already sorted.
    if (low < high) {
        // pi is the partitioning index, arr[pi] is now at its correct sorted position
        const pi = partition(arr, low, high);

        // Recursively sort the sub-arrays before and after the partition index
        quicksortRecursive(arr, low, pi - 1);  // Sort left sub-array
        quicksortRecursive(arr, pi + 1, high); // Sort right sub-array
    }
}

/**
 * Sorts an array in place using the Quicksort algorithm.
 * This is the entry point function for quicksort.
 *
 * @param arr The array to be sorted.
 * @returns The sorted array (modified in place).
 */
export function quicksort<T>(arr: T[]): T[] {
    if (!arr || arr.length === 0) {
        return arr; // Handle empty or null array
    }
    quicksortRecursive(arr, 0, arr.length - 1);
    return arr;
}
// Example 1: Array of numbers
let numbers = [10, 7, 8, 9, 1, 5];
console.log("Original numbers array:", numbers);
quicksort(numbers);
console.log("Sorted numbers array:", numbers); // Output: [1, 5, 7, 8, 9, 10]

// Example 2: Array of strings (lexicographical sort)
let fruits = ["banana", "apple", "cherry", "date"];
console.log("Original fruits array:", fruits);
quicksort(fruits);
console.log("Sorted fruits array:", fruits); // Output: ["apple", "banana", "cherry", "date"]

// Example 3: Edge cases
let emptyArr: number[] = [];
console.log("Original empty array:", emptyArr);
quicksort(emptyArr);
console.log("Sorted empty array:", emptyArr); // Output: []

let singleElementArr = [42];
console.log("Original single element array:", singleElementArr);
quicksort(singleElementArr);
console.log("Sorted single element array:", singleElementArr); // Output: [42]

let alreadySorted = [1, 2, 3, 4, 5];
console.log("Original already sorted array:", alreadySorted);
quicksort(alreadySorted);
console.log("Sorted already sorted array:", alreadySorted); // Output: [1, 2, 3, 4, 5]

let reverseSorted = [5, 4, 3, 2, 1];
console.log("Original reverse sorted array:", reverseSorted);
quicksort(reverseSorted);
console.log("Sorted reverse sorted array:", reverseSorted); // Output: [1, 2, 3, 4, 5]
// Example of a generic quicksort with a custom comparator
function quicksortWithComparator<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    function partition(arr: T[], low: number, high: number): number {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (compareFn(arr[j], pivot) <= 0) { // Use compareFn here
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }

    function quicksortRecursive(arr: T[], low: number, high: number): void {
        if (low < high) {
            const pi = partition(arr, low, high);
            quicksortRecursive(arr, low, pi - 1);
            quicksortRecursive(arr, pi + 1, high);
        }
    }

    if (!arr || arr.length === 0) {
        return arr;
    }
    quicksortRecursive(arr, 0, arr.length - 1);
    return arr;
}

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

let people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
];

console.log("\nOriginal people array:", people);

// Sort by age, then by name for tie-breaking
quicksortWithComparator(people, (a, b) => {
    if (a.age !== b.age) {
        return a.age - b.age; // Sort by age ascending
    }
    return a.name.localeCompare(b.name); // Then by name ascending
});

console.log("Sorted people array:", people);
// Output: [
//   { name: 'Bob', age: 25 },
//   { name: 'David', age: 25 },
//   { name: 'Alice', age: 30 },
//   { name: 'Charlie', age: 35 }
// ]
