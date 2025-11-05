function selectionSort(arr: number[]): number[] {
    const array = [...arr]; // Create a copy to avoid mutating the original array
    
    for (let i = 0; i < array.length - 1; i++) {
        // Assume the current position is the minimum
        let minIndex = i;
        
        // Find the index of the minimum element in the remaining unsorted portion
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap the found minimum element with the element at position i
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    
    return array;
}
function selectionSortGeneric<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const array = [...arr];
    
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) {
            if (compareFn(array[j], array[minIndex]) < 0) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    
    return array;
}
function selectionSortInPlace(arr: number[]): void {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            // Swap using temporary variable
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];

// Basic selection sort
console.log("Original:", numbers);
console.log("Sorted:", selectionSort(numbers));

// Generic selection sort with numbers
console.log("Generic number sort:", selectionSortGeneric(numbers));

// Generic selection sort with strings
console.log("Generic string sort:", selectionSortGeneric(strings));

// Generic selection sort with custom comparator for descending order
const descendingSort = selectionSortGeneric(numbers, (a, b) => b - a);
console.log("Descending order:", descendingSort);

// In-place sorting
const mutableArray = [64, 34, 25, 12, 22, 11, 90];
selectionSortInPlace(mutableArray);
console.log("In-place sorted:", mutableArray);
class Sorter {
    static selectionSort<T>(
        arr: T[], 
        compareFn?: (a: T, b: T) => number
    ): T[] {
        const array = [...arr];
        const comparator = compareFn || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
        
        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            
            for (let j = i + 1; j < array.length; j++) {
                if (comparator(array[j], array[minIndex]) < 0) {
                    minIndex = j;
                }
            }
            
            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
            }
        }
        
        return array;
    }
}

// Usage
const sortedNumbers = Sorter.selectionSort([3, 1, 4, 1, 5, 9, 2, 6]);
console.log("Class-based sort:", sortedNumbers);
