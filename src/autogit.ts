function binarySearchRecursive(
    arr: number[],
    target: number,
    start: number = 0,
    end: number = arr.length - 1
): number {
    // Base case: element not found
    if (start > end) {
        return -1;
    }

    const mid = Math.floor((start + end) / 2);

    // Element found at mid index
    if (arr[mid] === target) {
        return mid;
    }

    // Search in the left half
    if (target < arr[mid]) {
        return binarySearchRecursive(arr, target, start, mid - 1);
    } 
    // Search in the right half
    else {
        return binarySearchRecursive(arr, target, mid + 1, end);
    }
}

// Example usage:
const sortedArray = [2, 4, 6, 8, 10, 12, 14, 16];
const targets = [10, 5, 16, 1];

targets.forEach(target => {
    const index = binarySearchRecursive(sortedArray, target);
    console.log(`Target ${target} found at index: ${index}`);
});
Target 10 found at index: 4
Target 5 found at index: -1
Target 16 found at index: 7
Target 1 found at index: -1
