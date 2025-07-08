function mergeSort(arr: number[]): number[] {
    const n = arr.length;
    if (n < 2) return arr; // If the array is already sorted

    // Create a temporary array to hold the merged results
    const temp: number[] = new Array(n);
    
    // The size of the subarrays to be merged
    for (let size = 1; size < n; size *= 2) {
        // Merge subarrays in pairs of size 'size'
        for (let leftStart = 0; leftStart < n; leftStart += size * 2) {
            const mid = Math.min(leftStart + size, n);
            const rightEnd = Math.min(leftStart + size * 2, n);
            merge(arr, temp, leftStart, mid, rightEnd);
        }
        // Copy the sorted subarrays back to the original array
        for (let i = 0; i < n; i++) {
            arr[i] = temp[i];
        }
    }
    return arr;
}

function merge(arr: number[], temp: number[], leftStart: number, mid: number, rightEnd: number): void {
    let left = leftStart; // Initial index of the first subarray
    let right = mid;      // Initial index of the second subarray
    let index = leftStart; // Initial index of the merged subarray

    // Merge the two subarrays
    while (left < mid && right < rightEnd) {
        if (arr[left] <= arr[right]) {
            temp[index++] = arr[left++];
        } else {
            temp[index++] = arr[right++];
        }
    }

    // Copy remaining elements of left subarray, if any
    while (left < mid) {
        temp[index++] = arr[left++];
    }

    // Copy remaining elements of right subarray, if any
    while (right < rightEnd) {
        temp[index++] = arr[right++];
    }
}

// Usage example
const array = [38, 27, 43, 3, 9, 82, 10];
console.log('Original Array:', array);
const sortedArray = mergeSort(array);
console.log('Sorted Array:', sortedArray);
