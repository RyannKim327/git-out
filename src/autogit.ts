function binarySearchRecursive(
    arr: number[],
    target: number,
    low: number = 0,
    high: number = arr.length - 1
): number {
    // base case: not found
    if (low > high) {
        return -1;
    }

    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] > target) {
        // search in left half
        return binarySearchRecursive(arr, target, low, mid - 1);
    } else {
        // search in right half
        return binarySearchRecursive(arr, target, mid + 1, high);
    }
}

// Example usage:
const sortedArray = [1, 3, 5, 7, 9, 11];
console.log(binarySearchRecursive(sortedArray, 7)); // Output: 3
console.log(binarySearchRecursive(sortedArray, 4)); // Output: -1
