function binarySearch(arr: number[], target: number, start: number = 0, end: number = arr.length - 1): number | null {
    // Base case: element not found
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
        // Target found at mid index
        return mid;
    } else if (target < arr[mid]) {
        // Search left half
        return binarySearch(arr, target, start, mid - 1);
    } else {
        // Search right half
        return binarySearch(arr, target, mid + 1, end);
    }
}
const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const target = 23;

const result = binarySearch(sortedArray, target);
console.log(result); // Output: 5 (index where 23 is found)
