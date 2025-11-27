/**
 * Sorts an array using the Bubble Sort algorithm.
 * 
 * @param arr - The array to be sorted
 * @param comparator - (Optional) Custom comparator function
 * @returns A new sorted array (does not mutate original array)
 * 
 * @example
 * // Sort numbers in ascending order
 * bubbleSort([3, 1, 4, 2]);
 * 
 * // Sort strings alphabetically
 * bubbleSort(['banana', 'apple', 'cherry']);
 * 
 * // Sort objects by property
 * const people = [{name: 'Alice', age: 30}, {name: 'Bob', age: 25}];
 * bubbleSort(people, (a, b) => a.age - b.age);
 */
function bubbleSort<T>(arr: T[], comparator?: (a: T, b: T) => number): T[] {
    // Create a copy of the array to avoid mutating the original
    const array = arr.slice();
    const n = array.length;
    
    // Default comparator works for numbers/strings
    const comp = comparator || ((a: any, b: any) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (comp(array[j], array[j + 1]) > 0) {
                // Swap elements using destructuring
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            }
        }
        
        // If no swaps occurred, array is sorted
        if (!swapped) break;
    }
    
    return array;
}
const numbers = [5, 3, 8, 1, 2];
console.log(bubbleSort(numbers)); // [1, 2, 3, 5, 8]
const fruits = ['banana', 'apple', 'orange', 'kiwi'];
console.log(bubbleSort(fruits)); // ['apple', 'banana', 'kiwi', 'orange']
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];

// Sort by age ascending
const sortedByAge = bubbleSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
/*
[
    { name: 'Bob', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Charlie', age: 35 }
]
*/

// Sort by name alphabetically
const sortedByName = bubbleSort(people, (a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);
/*
[
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
]
*/
const numbers = [5, 3, 8, 1, 2];
const descending = bubbleSort(numbers, (a, b) => b - a);
console.log(descending); // [8, 5, 3, 2, 1]
