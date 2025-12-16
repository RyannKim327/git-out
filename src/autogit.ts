function selectionSort(arr: number[]): number[] {
    const array = [...arr]; // Create a copy to avoid mutating original array
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Find the index of the minimum element in the unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the first element of unsorted portion
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    
    return array;
}

// Usage
const numbers = [64, 25, 12, 22, 11];
const sortedNumbers = selectionSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 64]
function selectionSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const array = [...arr];
    const n = array.length;
    const compare = compareFn || ((a: T, b: T) => a < b ? -1 : a > b ? 1 : 0);
    
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

// Usage examples
const numbersGeneric = [64, 25, 12, 22, 11];
const strings = ["banana", "apple", "cherry", "date"];
const objects = [
    { name: "John", age: 25 },
    { name: "Alice", age: 20 },
    { name: "Bob", age: 30 }
];

// Sort numbers
const sortedNumbersGeneric = selectionSortGeneric(numbersGeneric);
console.log(sortedNumbersGeneric);

// Sort strings
const sortedStrings = selectionSortGeneric(strings);
console.log(sortedStrings);

// Sort objects by age
const sortedObjects = selectionSortGeneric(objects, (a, b) => a.age - b.age);
console.log(sortedObjects);
function selectionSortInPlace(arr: number[]): void {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            // Traditional swap without destructuring
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

// Usage
const numbersInPlace = [64, 25, 12, 22, 11];
selectionSortInPlace(numbersInPlace);
console.log(numbersInPlace); // [11, 12, 22, 25, 64]
function safeSelectionSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    if (!Array.isArray(arr)) {
        throw new Error("Input must be an array");
    }
    
    if (arr.length <= 1) {
        return [...arr];
    }
    
    const array = [...arr];
    const n = array.length;
    const compare = compareFn || ((a: T, b: T) => {
        if (typeof a === 'number' && typeof b === 'number') {
            return a - b;
        }
        return String(a).localeCompare(String(b));
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
// Test function
function testSelectionSort(): void {
    const testCases = [
        [5, 2, 8, 1, 9],
        [1],
        [],
        [3, 3, 3],
        [9, 8, 7, 6, 5, 4, 3, 2, 1]
    ];
    
    testCases.forEach((testCase, index) => {
        const result = selectionSort(testCase);
        const expected = [...testCase].sort((a, b) => a - b);
        const isCorrect = JSON.stringify(result) === JSON.stringify(expected);
        
        console.log(`Test ${index + 1}: ${isCorrect ? 'PASS' : 'FAIL'}`);
        console.log(`Input: [${testCase}]`);
        console.log(`Output: [${result}]`);
        console.log('---');
    });
}

testSelectionSort();
