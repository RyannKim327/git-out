function interpolationSearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // If all elements in the current range are identical
        if (arr[low] === arr[high]) {
            return arr[low] === target ? low : -1;
        }

        // Calculate probe position using interpolation formula
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        // Prevent out-of-bounds access (due to potential rounding errors)
        if (pos < low || pos > high) break;

        // Check if we found the target
        if (arr[pos] === target) return pos;

        // Narrow the search range
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return -1; // Target not found
}
const sortedArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const target = 70;

console.log(interpolationSearch(sortedArray, target)); // Output: 6

// Edge case: Element not found
console.log(interpolationSearch(sortedArray, 42));    // Output: -1
console.log(interpolationSearch([], 42));             // Output: -1
