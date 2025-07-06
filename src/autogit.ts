function bubbleSort(arr: number[]): number[] {
    let n = arr.length;
    let swapped: boolean;

    // Outer loop for each element in the array
    do {
        swapped = false; // Reset swapped flag for this pass

        // Inner loop to compare adjacent elements
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap if elements are in the wrong order
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true; // Set flag to true since a swap occurred
            }
        }
        // Reduce the effective size of the array for the next pass
        n--; 
    } while (swapped); // Continue until no swaps are made

    return arr;
}

// Example usage:
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(unsortedArray);
console.log('Sorted Array:', sortedArray);
