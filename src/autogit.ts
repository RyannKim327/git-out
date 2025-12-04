function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    // Flag to optimize if no swaps occur (array already sorted)
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        // If no swaps occurred, array is sorted
        if (!swapped) break;
    }
    return arr;
}
function genericBubbleSort<T>(
    arr: T[],
    compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
    const n = arr.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(arr[j], arr[j + 1]) > 0) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}
// Number sorting
const numbers = [64, 34, 25, 12, 22, 11, 90];
bubbleSort(numbers);
console.log(numbers); // [11, 12, 22, 25, 34, 64, 90]

// Generic string sorting
const strings = ["banana", "apple", "cherry"];
genericBubbleSort(strings, (a, b) => a.localeCompare(b));
console.log(strings); // ["apple", "banana", "cherry"]

// Object sorting
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    {name: "John", age: 30},
    {name: "Alice", age: 25},
    {name: "Bob", age: 35}
];

genericBubbleSort(people, (a, b) => a.age - b.age);
console.log(people); // Sorted by age ascending
