function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no swaps occurred, array is sorted
        if (!swipped) break;
    }
    
    return arr;
}

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]
function bubbleSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const n = arr.length;
    let swapped: boolean;
    
    // Default comparison function for numbers
    const compare = compareFn || ((a: T, b: T) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(arr[j], arr[j + 1]) > 0) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return arr;
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ['banana', 'apple', 'cherry', 'date'];
const objects = [
    { name: 'John', age: 25 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 }
];

// Sort numbers
console.log(bubbleSort(numbers));

// Sort strings
console.log(bubbleSort(strings));

// Sort objects by age
console.log(bubbleSort(objects, (a, b) => a.age - b.age));

// Sort objects by name
console.log(bubbleSort(objects, (a, b) => a.name.localeCompare(b.name)));
function bubbleSort<T>(arr: readonly T[], compareFn?: (a: T, b: T) => number): T[] {
    const result = [...arr]; // Create a copy
    const n = result.length;
    let swapped: boolean;
    
    const compare = compareFn || ((a: T, b: T) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(result[j], result[j + 1]) > 0) {
                // Swap elements
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return result;
}

// Usage
const original = [3, 1, 4, 1, 5, 9, 2, 6];
const sorted = bubbleSort(original);

console.log('Original:', original); // [3, 1, 4, 1, 5, 9, 2, 6]
console.log('Sorted:', sorted);     // [1, 1, 2, 3, 4, 5, 6, 9]
