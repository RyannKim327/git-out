function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j + 1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // If no two elements were swapped by inner loop, array is sorted
        if (!swapped) break;
    }

    return arr;
}

// Example usage:
const arrayToSort = [64, 34, 25, 12, 22, 11, 90];
console.log('Sorted array:', bubbleSort(arrayToSort));
