function binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (arr[mid] === target) {
            return mid; // Found it!
        }

        if (arr[mid] < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }

    return -1; // Not found
}

// Example usage:
const numbers = [1, 3, 5, 7, 9, 11];
console.log(binarySearch(numbers, 7));  // Output: 3
console.log(binarySearch(numbers, 4));  // Output: -1
