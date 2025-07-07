function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Calculate the position using the interpolation formula
        const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (target - arr[low]));

        // Check if the target is found
        if (arr[pos] === target) {
            return pos;  // Return the index of the found target
        }

        // If target is greater, ignore the left half
        if (arr[pos] < target) {
            low = pos + 1;
        } 
        // If target is smaller, ignore the right half
        else {
            high = pos - 1;
        }
    }

    return -1;  // Target not found
}

// Example usage
const sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const targetValue = 70;

const index = interpolationSearch(sortedArray, targetValue);
if (index !== -1) {
    console.log(`Element found at index: ${index}`);
} else {
    console.log('Element not found in the array.');
}
