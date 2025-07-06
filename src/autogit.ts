function countingSort(arr: number[], exp: number): number[] {
    const output: number[] = new Array(arr.length); // Output array
    const count: number[] = new Array(10).fill(0); // Count array for digits 0-9

    // Store count of occurrences in count[]
    for (let i = 0; i < arr.length; i++) {
        const index = Math.floor(Math.abs(arr[i]) / exp) % 10;
        count[index]++;
    }

    // Change count[i] so that it contains the actual position of this digit in output[]
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const index = Math.floor(Math.abs(arr[i]) / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    return output;
}

function radixSort(arr: number[]): number[] {
    // Find the maximum number to know the number of digits
    const max = Math.max(...arr.map(Math.abs)); // Handle negative numbers

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        arr = countingSort(arr, exp);
    }

    return arr;
}

// Example usage
const numbers = [170, 45, 75, -90, 802, 24, 2, -66];
const sortedNumbers = radixSort(numbers);
console.log(sortedNumbers); // Output: [ -90, -66, 2, 24, 45, 75, 170, 802 ]
