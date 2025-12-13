function selectionSort<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...array];
    const n = sortedArray.length;
    
    // Use default comparison if none provided
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (let i = 0; i < n - 1; i++) {
        // Assume the current position is the minimum
        let minIndex = i;
        
        // Find the minimum element in the remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            if (compare(sortedArray[j], sortedArray[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element of unsorted part
        if (minIndex !== i) {
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
    }
    
    return sortedArray;
}

// Example usage:
const numbers = [64, 25, 12, 22, 11];
console.log('Original:', numbers);
console.log('Sorted:', selectionSort(numbers));

const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Original strings:', strings);
console.log('Sorted strings:', selectionSort(strings));

// With custom comparator (sort by string length)
const words = ['apple', 'banana', 'cherry', 'date'];
console.log('Original words:', words);
console.log('Sorted by length:', selectionSort(words, (a, b) => a.length - b.length));

// With objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 20 },
    { name: 'Bob', age: 30 }
];

console.log('Sorted by age:', selectionSort(people, (a, b) => a.age - b.age));
function selectionSortInPlace<T>(array: T[], compareFn?: (a: T, b: T) => number): T[] {
    const n = array.length;
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compare(array[j], array[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    
    return array;
}
