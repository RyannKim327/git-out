function selectionSort(arr: number[]): number[] {
    const array = [...arr]; // Create a copy to avoid mutating the original
    
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        // Find the minimum element in the remaining unsorted portion
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    
    return array;
}
function selectionSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const array = [...arr];
    const compare = compareFn || ((a: T, b: T) => a < b ? -1 : a > b ? 1 : 0);
    
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) {
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
class SelectionSort {
    static sort(arr: number[]): number[] {
        return selectionSort(arr);
    }
    
    static sortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
        return selectionSortGeneric(arr, compareFn);
    }
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", selectionSort(numbers));

// Generic usage
const strings = ["banana", "apple", "cherry", "date"];
console.log("Strings:", selectionSortGeneric(strings));

// With custom comparator
const people = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
];

const sortedByAge = selectionSortGeneric(people, (a, b) => a.age - b.age);
console.log("People by age:", sortedByAge);
function selectionSort(arr: number[]): number[] {
    const array = [...arr];
    
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        // ES6 destructuring swap
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    
    return array;
}

// Test the implementation
const testArrays = [
    [5, 2, 4, 6, 1, 3],
    [1],
    [],
    [3, 1, 2],
    [9, 8, 7, 6, 5, 4, 3, 2, 1]
];

testArrays.forEach((arr, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Input: [${arr}]`);
    console.log(`Output: [${selectionSort(arr)}]`);
    console.log('---');
});
