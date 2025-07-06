function binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        // Calculate the middle index
        const mid = Math.floor((low + high) / 2);

        // Check if the target is present at mid
        if (arr[mid] === target) {
            return mid; // Target found, return index
        }

        // If target is greater, ignore the left half
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            // If target is smaller, ignore the right half
            high = mid - 1;
        }
    }

    // Target was not found in the array
    return -1;
}

// Example Usage
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;
const index = binarySearch(sortedArray, target);

if (index !== -1) {
    console.log(`Element found at index: ${index}`);
} else {
    console.log("Element not found in the array.");
}
