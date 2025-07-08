function mergeSort(arr: number[]): number[] {
    const n = arr.length;
    if (n < 2) return arr; // Base case: if the array has less than 2 elements, it's already sorted.

    // Create a temporary array to hold the sorted elements
    const temp: number[] = new Array(n);
    
    // Iterate over the subarray sizes
    for (let size = 1; size < n; size *= 2) {
        for (let leftStart = 0; leftStart < n; leftStart += size * 2) {
            const mid = Math.min(leftStart + size, n);
            const rightEnd = Math.min(leftStart + size * 2, n);
            merge(arr, temp, leftStart, mid, rightEnd);
        }
    }
    
    return arr;
}

function merge(arr: number[], temp: number[], leftStart: number, mid: number, rightEnd: number): void {
    let left = leftStart; // Starting index for left subarray
    let right = mid;      // Starting index for right subarray
    let index = leftStart; // Starting index to be merged

    // Merge the two subarrays into temp[]
    while (left < mid && right < rightEnd) {
        if (arr[left] <= arr[right]) {
            temp[index++] = arr[left++];
        } else {
            temp[index++] = arr[right++];
        }
    }

    // Copy the remaining elements of left subarray, if any
    while (left < mid) {
        temp[index++] = arr[left++];
    }

    // Copy the remaining elements of right subarray, if any
    while (right < rightEnd) {
        temp[index++] = arr[right++];
    }

    // Copy the sorted subarray back into the original array
    for (let i = leftStart; i < rightEnd; i++) {
        arr[i] = temp[i];
    }
}

// Example usage
const array = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(array);
console.log(sortedArray); // Output: [3, 9, 10, 27, 38, 43, 82]
