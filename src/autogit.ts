function merge(arr: number[], left: number, mid: number, right: number): void {
    // Create temporary arrays to hold the left and right subarrays
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0; // Initial index of first subarray
    let j = 0; // Initial index of second subarray
    let k = left; // Initial index of merged subarray

    // Merge the temporary arrays back into arr[left..right]
    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements of leftArr, if any
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    // Copy the remaining elements of rightArr, if any
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

function iterativeMergeSort(arr: number[]): number[] {
    const n = arr.length;
    // Start with subarrays of size 1
    let currSize;
    for (currSize = 1; currSize < n; currSize *= 2) {
        // Pick starting point of different subarrays of current size
        for (let leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
            // Find ending point of left subarray
            const mid = Math.min(leftStart + currSize - 1, n - 1);
            // Find ending point of right subarray
            const rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);

            // Merge subarrays arr[leftStart...mid] and arr[mid+1...rightEnd]
            if (mid < rightEnd) {
                merge(arr, leftStart, mid, rightEnd);
            }
        }
    }
    return arr;
}

// Example usage
const arrayToSort = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = iterativeMergeSort(arrayToSort);
console.log(sortedArray); // Output: [3, 9, 10, 27, 38, 43, 82]
