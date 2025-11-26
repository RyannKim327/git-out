/**
 * Merge two sorted arrays into one sorted array
 * @param left Left sorted array
 * @param right Right sorted array
 * @returns Merged sorted array
 */
function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements and add the smaller one to the result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements from left array
    while (leftIndex < left.length) {
        result.push(left[leftIndex]);
        leftIndex++;
    }

    // Add remaining elements from right array
    while (rightIndex < right.length) {
        result.push(right[rightIndex]);
        rightIndex++;
    }

    return result;
}

/**
 * Recursive merge sort implementation
 * @param array Array to be sorted
 * @returns Sorted array
 */
function mergeSort(array: number[]): number[] {
    // Base case: arrays with 0-1 elements are already sorted
    if (array.length <= 1) {
        return array;
    }

    // Split array into two halves
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Recursively sort and merge
    return merge(
        mergeSort(left),
        mergeSort(right)
    );
}

// Example usage:
const unsortedArray = [7, 2, 5, 3, 7, 13, 1, 6];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); 
// Output: [1, 2, 3, 5, 6, 7, 7, 13]
function merge<T>(left: T[], right: T[]): T[] {
    // ... (add comparison logic for type T)
}

function mergeSort<T>(array: T[]): T[] {
    // ... same logic with generic type
}
