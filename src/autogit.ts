function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean;

    // Loop through all elements in the array
    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        // Last i elements are already sorted
        for (let j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if they are in the wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // If no two elements were swapped, the array is sorted
        if (!swapped) {
            break;
        }
    }

    return arr;
}

// Example usage
const array = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(array);
console.log(sortedArray); // Output: [11, 12, 22, 25, 34, 64, 90]
