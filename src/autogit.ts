// Function to perform Counting Sort on the input array based on the digit represented by exp
function countingSort(arr: number[], exp: number): number[] {
    const n = arr.length;
    const output: number[] = new Array(n); // output array to hold sorted numbers
    const count: number[] = new Array(10).fill(0); // count array for digit frequencies

    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
        const index = Math.floor(arr[i] / exp) % 10; // Get the digit at exp
        count[index]++;
    }

    // Change count[i] so that it contains the actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    return output; // Return sorted output array
}

// Function to get the maximum value in the array
function getMax(arr: number[]): number {
    return Math.max(...arr);
}

// Function to perform Radix Sort
function radixSort(arr: number[]): number[] {
    const max = getMax(arr); // Find the maximum number to know the number of digits

    // Do counting sort for every digit. exp is 10^i where i is the current digit number
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        arr = countingSort(arr, exp);
    }

    return arr; // Return the sorted array
}

// Example usage
const arr = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Unsorted array:", arr);
const sortedArray = radixSort(arr);
console.log("Sorted array:", sortedArray);
