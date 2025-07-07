function getMaxValue(arr: number[]): number {
    return Math.max(...arr);
}

function countingSortByDigit(arr: number[], digitPlace: number): number[] {
    const n = arr.length;
    const output: number[] = new Array(n).fill(0);
    const count: number[] = new Array(10).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
        const digit = Math.floor((arr[i] / digitPlace) % 10);
        count[digit]++;
    }

    // Change count[i] so that count[i] contains actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor((arr[i] / digitPlace) % 10);
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    return output;
}

function radixSort(arr: number[]): number[] {
    if (arr.length === 0) {
        return arr;
    }

    const maxVal = getMaxValue(arr);
    let digitPlace = 1;

    // Loop until we've processed all digit places
    while (Math.floor(maxVal / digitPlace) > 0) {
        arr = countingSortByDigit(arr, digitPlace);
        digitPlace *= 10;
    }

    return arr;
}

// Example usage:
const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
const sortedNumbers = radixSort(numbers);
console.log(sortedNumbers); // Output: [2, 24, 45, 66, 75, 90, 170, 802]
