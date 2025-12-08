function gnomeSort(arr: number[]): number[] {
    let i = 0;
    while (i < arr.length) {
        if (i === 0 || arr[i] >= arr[i - 1]) {
            i++;
        } else {
            // Swap arr[i] and arr[i - 1]
            [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
            i--;
        }
    }
    return arr;
}

// Example usage:
const example = [5, 2, 9, 1, 5, 6];
console.log(gnomeSort(example)); // Output: [1, 2, 5, 5, 6, 9]
