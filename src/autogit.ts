function iterativeMergeSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const n = array.length;
    const tempArray: T[] = new Array(n);
    
    // Start with width 1 and double each time
    for (let width = 1; width < n; width *= 2) {
        for (let left = 0; left < n; left += 2 * width) {
            const mid = Math.min(left + width, n);
            const right = Math.min(left + 2 * width, n);
            
            merge(array, tempArray, left, mid, right);
        }
        
        // Copy tempArray back to array for next pass
        for (let i = 0; i < n; i++) {
            array[i] = tempArray[i];
        }
    }
    
    return array;
}

function merge<T>(array: T[], tempArray: T[], left: number, mid: number, right: number): void {
    let i = left;
    let j = mid;
    let k = left;
    
    while (i < mid && j < right) {
        if (array[i] <= array[j]) {
            tempArray[k++] = array[i++];
        } else {
            tempArray[k++] = array[j++];
        }
    }
    
    // Copy remaining elements from left subarray
    while (i < mid) {
        tempArray[k++] = array[i++];
    }
    
    // Copy remaining elements from right subarray
    while (j < right) {
        tempArray[k++] = array[j++];
    }
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = iterativeMergeSort(numbers);
console.log("Sorted numbers:", sortedNumbers);

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = iterativeMergeSort(strings);
console.log("Sorted strings:", sortedStrings);
function iterativeMergeSortWithComparator<T>(
    array: T[], 
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }

    const n = array.length;
    const tempArray: T[] = new Array(n);
    
    for (let width = 1; width < n; width *= 2) {
        for (let left = 0; left < n; left += 2 * width) {
            const mid = Math.min(left + width, n);
            const right = Math.min(left + 2 * width, n);
            
            mergeWithComparator(array, tempArray, left, mid, right, comparator);
        }
        
        for (let i = 0; i < n; i++) {
            array[i] = tempArray[i];
        }
    }
    
    return array;
}

function mergeWithComparator<T>(
    array: T[], 
    tempArray: T[], 
    left: number, 
    mid: number, 
    right: number,
    comparator: (a: T, b: T) => number
): void {
    let i = left;
    let j = mid;
    let k = left;
    
    while (i < mid && j < right) {
        if (comparator(array[i], array[j]) <= 0) {
            tempArray[k++] = array[i++];
        } else {
            tempArray[k++] = array[j++];
        }
    }
    
    while (i < mid) {
        tempArray[k++] = array[i++];
    }
    
    while (j < right) {
        tempArray[k++] = array[j++];
    }
}

// Usage with custom comparator
const customSorted = iterativeMergeSortWithComparator(
    [5, 2, 8, 1, 9],
    (a, b) => b - a // Sort in descending order
);
console.log("Custom sorted:", customSorted);
