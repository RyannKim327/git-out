function insertionSort(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;
        
        // Shift elements greater than current to the right
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert current element in correct position
        arr[j + 1] = current;
    }
    return arr;
}
function insertionSortGeneric<T>(
    arr: T[],
    compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;
        
        // Shift elements where compare() returns > 0
        while (j >= 0 && compare(arr[j], current) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = current;
    }
    return arr;
}
// Number sorting (basic)
const numbers = [5, 2, 4, 6, 1, 3];
insertionSort(numbers);
console.log(numbers); // [1, 2, 3, 4, 5, 6]

// Generic number sorting (optional comparator)
insertionSortGeneric(numbers);
console.log(numbers); // [1, 2, 3, 4, 5, 6]

// String sorting
const strings = ['cherry', 'apple', 'banana'];
insertionSortGeneric(strings, (a, b) => a.localeCompare(b));
console.log(strings); // ['apple', 'banana', 'cherry']

// Object sorting
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 20 },
    { name: 'Bob', age: 30 }
];

insertionSortGeneric(people, (a, b) => a.age - b.age);
console.log(people); // Sorted by age ascending
