function selectionSort(arr: number[]): number[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Assume the current position has the minimum value
        let minIndex = i;
        
        // Find the index of the minimum element in the remaining unsorted portion
        for (let j = i + 1; j < n; j++) {
            if (sortedArray[j] < sortedArray[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the element at position i
        if (minIndex !== i) {
            const temp = sortedArray[i];
            sortedArray[i] = sortedArray[minIndex];
            sortedArray[minIndex] = temp;
        }
    }
    
    return sortedArray;
}
function selectionSortGeneric<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (compareFn(sortedArray[j], sortedArray[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
        }
    }
    
    return sortedArray;
}
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
            // Using array destructuring for swapping
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }
}
// Basic usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", selectionSort(numbers));

// Generic usage with numbers
const sortedNumbers = selectionSortGeneric(numbers);
console.log("Generic sorted:", sortedNumbers);

// Generic usage with strings
const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = selectionSortGeneric(strings);
console.log("Sorted strings:", sortedStrings);

// Generic with custom comparator (descending order)
const descendingNumbers = selectionSortGeneric(numbers, (a, b) => b - a);
console.log("Descending:", descendingNumbers);

// In-place sorting
const mutableArray = [64, 34, 25, 12, 22, 11, 90];
selectionSortInPlace(mutableArray);
console.log("In-place sorted:", mutableArray);
