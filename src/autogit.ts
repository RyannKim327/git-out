function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    const n = arr.length;
    let temp = new Array(n); // Temporary array for merging

    // Size of subarrays to be merged
    for (let size = 1; size < n; size *= 2) {
        for (let leftStart = 0; leftStart < n; leftStart += size * 2) {
            let leftEnd = Math.min(leftStart + size - 1, n - 1); // End of left subarray
            let rightStart = leftEnd + 1; // Start of right subarray
            let rightEnd = Math.min(leftStart + size * 2 - 1, n - 1); // End of right subarray

            // Merge the two subarrays
            merge(arr, temp, leftStart, leftEnd, rightStart, rightEnd);
        }
    }

    return arr;
}

function merge(arr: number[], temp: number[], leftStart: number, leftEnd: number, rightStart: number, rightEnd: number) {
    let i = leftStart; // Starting index for left subarray
    let j = rightStart; // Starting index for right subarray
    let k = leftStart; // Starting index to be merged

    // Merge while there are elements in both subarrays
    while (i <= leftEnd && j <= rightEnd) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    // Copy remaining elements of left subarray, if any
    while (i <= leftEnd) {
        temp[k++] = arr[i++];
    }

    // Copy remaining elements of right subarray, if any
    while (j <= rightEnd) {
        temp[k++] = arr[j++];
    }

    // Copy the merged subarray back to the original array
    for (let index = leftStart; index <= rightEnd; index++) {
        arr[index] = temp[index];
    }
}

// Example usage:
const array = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(array);
console.log(sortedArray); // Output: [3, 9, 10, 27, 38, 43, 82]
