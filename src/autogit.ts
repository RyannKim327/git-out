function selectionSort(arr: number[]): number[] {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        // Find the index of the smallest element in the unsorted part
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap if a smaller element was found
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr; // Now sorted
}

// Example usage:
const nums = [64, 25, 12, 22, 11];
console.log(selectionSort(nums)); // [11, 12, 22, 25, 64]
