function shellSort(array: number[]): number[] {
    // Get the length of the array
    const n = array.length;
    let gap = Math.floor(n / 2);  // Initial gap size

    // Reduce gap until it becomes 0
    while (gap > 0) {
        // Perform insertion sort for the current gap
        for (let i = gap; i < n; i++) {
            const temp = array[i];  // Store current element
            let j = i;

            // Shift earlier |gap|-sorted elements until correct position is found
            while (j >= gap && array[j - gap] > temp) {
                array[j] = array[j - gap];  // Shift element
                j -= gap;
            }

            // Insert the stored element at its correct position
            array[j] = temp;
        }
        
        // Reduce gap size (common strategy: halve it)
        gap = Math.floor(gap / 2);
    }

    return array;
}
function shellSortGeneric<T>(
    array: T[],
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : (a > b ? 1 : 0)
): T[] {
    const n = array.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const current = array[i];
            let j = i;
            
            // Use comparator function instead of direct comparison
            while (j >= gap && compareFn(array[j - gap], current) > 0) {
                array[j] = array[j - gap];
                j -= gap;
            }
            array[j] = current;
        }
        gap = Math.floor(gap / 2);
    }
    
    return array;
}
// Example with numbers
const numbers = [12, 34, 54, 2, 3];
console.log(shellSort(numbers));  // [2, 3, 12, 34, 54]

// Example with strings (using generic version)
const strings = ['apple', 'Banana', 'cherry', 'date'];
console.log(
    shellSortGeneric(strings, (a, b) => a.localeCompare(b))
);
// ['apple', 'Banana', 'cherry', 'date']

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];

console.log(
    shellSortGeneric(people, (a, b) => a.age - b.age)
);
// Sorted by age (youngest to oldest)
