function shellSort(arr: number[]): number[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            // Shift elements until correct position is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}
function shellSortGeneric<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    // Default comparison function for numbers
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && compare(arr[j - gap], temp) > 0) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}
// Shell Sort Implementation
function shellSort(arr: number[]): number[] {
    const n = arr.length;
    let gap = Math.floor(n / 2);
    
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
        
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}

// Example usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90, 88, 76, 50];
console.log("Unsorted array:", unsortedArray);

const sortedArray = shellSort([...unsortedArray]); // Create copy to preserve original
console.log("Sorted array:", sortedArray);

// Generic version usage
const stringArray = ["banana", "apple", "cherry", "date"];
const sortedStrings = shellSortGeneric(stringArray, (a, b) => a.localeCompare(b));
console.log("Sorted strings:", sortedStrings);

// Complex object sorting
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 }
];

const sortedByAge = shellSortGeneric(people, (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);
// Performance test utility
function testPerformance(): void {
    const largeArray = Array.from({ length: 10000 }, () => 
        Math.floor(Math.random() * 1000)
    );
    
    console.time("Shell Sort");
    const sorted = shellSort(largeArray);
    console.timeEnd("Shell Sort");
    
    // Verify sorting
    const isSorted = sorted.every((val, i, arr) => 
        i === 0 || val >= arr[i - 1]
    );
    console.log("Array is sorted:", isSorted);
}

// Run performance test
testPerformance();
// Shell sort with different gap sequences
function shellSortWithGap(arr: number[], gapSequence: number[]): number[] {
    const n = arr.length;
    
    for (const gap of gapSequence) {
        if (gap >= n) continue;
        
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;
            
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            
            arr[j] = temp;
        }
    }
    
    return arr;
}

// Common gap sequences
const knuthSequence = (n: number): number[] => {
    const gaps = [];
    let gap = 1;
    while (gap < n) {
        gaps.unshift(gap);
        gap = gap * 3 + 1;
    }
    return gaps;
};

// Usage with Knuth sequence
const arrayToSort = [64, 34, 25, 12, 22, 11, 90];
const gaps = knuthSequence(arrayToSort.length);
const sortedWithKnuth = shellSortWithGap(arrayToSort, gaps);
