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
        
        // If no swapping occurred, array is sorted
        if (!swapped) break;
    }
    
    return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(numbers)); // [11, 12, 22, 25, 34, 64, 90]
function bubbleSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const n = arr.length;
    let swapped: boolean;
    
    // Default comparison function for numbers/strings
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
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

// Example usage with different types
const strings = ["banana", "apple", "cherry"];
console.log(bubbleSortGeneric(strings)); // ["apple", "banana", "cherry"]

const objects = [
    { name: "John", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 }
];

// Sort objects by age
console.log(bubbleSortGeneric(objects, (a, b) => a.age - b.age));
class BubbleSorter {
    static sort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
        const array = [...arr]; // Create a copy to avoid mutating original
        const n = array.length;
        let swapped: boolean;
        
        const compare = compareFn || ((a: T, b: T) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });
        
        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            
            for (let j = 0; j < n - i - 1; j++) {
                if (compare(array[j], array[j + 1]) > 0) {
                    // Swap elements
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    swapped = true;
                }
            }
            
            if (!swapped) break;
        }
        
        return array;
    }
}

// Example usage
const data = [5, 3, 8, 4, 2];
console.log(BubbleSorter.sort(data)); // [2, 3, 4, 5, 8]
