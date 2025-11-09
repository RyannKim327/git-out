function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", bubbleSort([...numbers])); // Use spread to avoid modifying original
function bubbleSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const n = arr.length;
    const compare = compareFn || ((a: T, b: T) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(arr[j], arr[j + 1]) > 0) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    
    return arr;
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];
const objects = [
    { name: "John", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 }
];

console.log(bubbleSortGeneric([...numbers]));
console.log(bubbleSortGeneric([...strings]));
console.log(bubbleSortGeneric([...objects], (a, b) => a.age - b.age));
function optimizedBubbleSort<T>(
    arr: T[], 
    compareFn?: (a: T, b: T) => number
): T[] {
    const n = arr.length;
    const compare = compareFn || ((a: T, b: T) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (compare(arr[j], arr[j + 1]) > 0) {
                // Swap elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        
        // If no swaps occurred, array is already sorted
        if (!swapped) break;
    }
    
    return arr;
}
class BubbleSorter<T> {
    constructor(private arr: T[]) {}
    
    sort(compareFn?: (a: T, b: T) => number): T[] {
        const n = this.arr.length;
        const compare = compareFn || this.defaultCompare;
        let swapped: boolean;
        
        do {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                if (compare(this.arr[i], this.arr[i + 1]) > 0) {
                    [this.arr[i], this.arr[i + 1]] = [this.arr[i + 1], this.arr[i]];
                    swapped = true;
                }
            }
        } while (swapped);
        
        return this.arr;
    }
    
    private defaultCompare(a: T, b: T): number {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    }
}

// Usage
const sorter = new BubbleSorter([64, 34, 25, 12, 22, 11, 90]);
console.log(sorter.sort());
// Sorting numbers
const numbers = [5, 2, 8, 1, 9];
console.log(bubbleSortGeneric([...numbers]));

// Sorting strings
const words = ["zebra", "apple", "banana", "cherry"];
console.log(bubbleSortGeneric([...words]));

// Sorting custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 }
];

console.log(bubbleSortGeneric([...people], (a, b) => a.age - b.age));
console.log(bubbleSortGeneric([...people], (a, b) => a.name.localeCompare(b.name)));
