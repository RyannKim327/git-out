function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Check if the target is present at mid
        if (arr[mid] === target) {
            return mid; // Target found
        }

        // If target is greater, ignore the left half
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            // If target is smaller, ignore the right half
            right = mid - 1;
        }
    }

    // Target not found
    return -1;
}

// Example usage:
const sortedArray = [1, 3, 5, 7, 9, 11, 13];
const target = 7;
const result = binarySearch(sortedArray, target);

if (result !== -1) {
    console.log(`Target found at index: ${result}`);
} else {
    console.log('Target not found');
}
