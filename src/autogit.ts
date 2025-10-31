function selectionSort(arr: number[]): number[] {
    const array = [...arr]; // Create a copy to avoid mutating the original
    
    for (let i = 0; i < array.length - 1; i++) {
        // Find the index of the minimum element in the unsorted portion
        let minIndex = i;
        
        for (let j = i + 1; j < array.length; j++) {
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
function selectionSort<T>(
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
// Complete implementation with type annotations
class SelectionSort {
    // For numbers (ascending order by default)
    static sortNumbers(arr: number[]): number[] {
        const array = [...arr];
        
        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            
            for (let j = i + 1; j < array.length; j++) {
                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }
            }
            
            if (minIndex !== i) {
                [array[i], array[minIndex]] = [array[minIndex], array[i]];
            }
        }
        
        return array;
    }
    
    // Generic implementation
    static sort<T>(
        arr: T[], 
        compareFn?: (a: T, b: T) => number
    ): T[] {
        const defaultCompare = (a: T, b: T): number => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        };
        
        const comparator = compareFn || defaultCompare;
        const array = [...arr];
        
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

// Test the implementation
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ['banana', 'apple', 'cherry', 'date'];

console.log('Original numbers:', numbers);
console.log('Sorted numbers:', SelectionSort.sortNumbers(numbers));

console.log('Original strings:', strings);
console.log('Sorted strings:', SelectionSort.sort(strings));

// Custom comparator for descending order
const descendingNumbers = SelectionSort.sort(numbers, (a, b) => b - a);
console.log('Descending order:', descendingNumbers);
function selectionSortInPlace(arr: number[]): void {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            // Swap using temporary variable (alternative to destructuring)
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

// Usage
const mutableArray = [64, 34, 25, 12, 22, 11, 90];
selectionSortInPlace(mutableArray);
console.log('Sorted in-place:', mutableArray);
