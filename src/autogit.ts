function insertionSort(arr: number[]): number[] {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;

        // Shift elements greater than current to the right
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert current in correct position
        arr[j + 1] = current;
    }
    return arr;
}
function genericInsertionSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;

        while (j >= 0 && compare(arr[j], current) > 0) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}
const numbers = [5, 2, 4, 6, 1, 3];
console.log(insertionSort(numbers)); // [1, 2, 3, 4, 5, 6]
const strings = ['cherry', 'apple', 'banana'];
const stringComparator = (a: string, b: string) => a.localeCompare(b);
console.log(genericInsertionSort(strings, stringComparator)); // ['apple', 'banana', 'cherry']
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 20 },
    { name: 'Bob', age: 30 }
];

const ageComparator = (a: Person, b: Person) => a.age - b.age;
console.log(genericInsertionSort(people, ageComparator));
// Sorted by age: Alice (20), John (25), Bob (30)
