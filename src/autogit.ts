function randomizedQuickSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    // Create a copy to avoid mutating original array
    const result = [...arr];
    
    // Default comparison function for numbers/strings
    const compare = compareFn || ((a: any, b: any) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    quickSortHelper(result, 0, result.length - 1, compare);
    return result;
}

function quickSortHelper<T>(
    arr: T[], 
    low: number, 
    high: number, 
    compare: (a: T, b: T) => number
): void {
    if (low < high) {
        // Partition and get pivot index
        const pi = randomizedPartition(arr, low, high, compare);
        
        // Recursively sort elements before and after partition
        quickSortHelper(arr, low, pi - 1, compare);
        quickSortHelper(arr, pi + 1, high, compare);
    }
}

function randomizedPartition<T>(
    arr: T[], 
    low: number, 
    high: number, 
    compare: (a: T, b: T) => number
): number {
    // Choose a random pivot index and swap with the last element
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    swap(arr, randomIndex, high);
    
    const pivot = arr[high];
    let i = low - 1; // Index of smaller element
    
    for (let j = low; j < high; j++) {
        // If current element is smaller than or equal to pivot
        if (compare(arr[j], pivot) <= 0) {
            i++;
            swap(arr, i, j);
        }
    }
    
    swap(arr, i + 1, high);
    return i + 1;
}

function swap<T>(arr: T[], i: number, j: number): void {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// Example usage and testing
function example() {
    // Test with numbers
    const numbers = [64, 34, 25, 12, 22, 11, 90];
    console.log("Original:", numbers);
    const sortedNumbers = randomizedQuickSort(numbers);
    console.log("Sorted:", sortedNumbers);
    console.log("Is sorted?", isSorted(sortedNumbers));
    
    // Test with strings
    const words = ["banana", "apple", "cherry", "date", "elderberry"];
    console.log("\nOriginal words:", words);
    const sortedWords = randomizedQuickSort(words);
    console.log("Sorted words:", sortedWords);
    
    // Test with custom comparison
    const people = [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 20 }
    ];
    
    const sortedByAge = randomizedQuickSort(people, (a, b) => a.age - b.age);
    console.log("\nPeople sorted by age:");
    sortedByAge.forEach(p => console.log(`${p.name}: ${p.age}`));
}

function isSorted<T>(arr: T[], compareFn?: (a: T, b: T) => number): boolean {
    const compare = compareFn || ((a: any, b: any) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (compare(arr[i], arr[i + 1]) > 0) {
            return false;
        }
    }
    return true;
}

// Run example
example();
