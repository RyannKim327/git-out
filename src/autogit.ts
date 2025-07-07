function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean;

    // Loop through each element in the array
    for (let i = 0; i < n - 1; i++) {
        swapped = false; // Reset the swapped flag for this iteration

        // Compare adjacent elements
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap if the elements are in the wrong order
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true; // Set the flag to true since a swap occurred
            }
        }

        // If no elements were swapped, the array is sorted
        if (!swapped) {
            break;
        }
    }

    return arr; // Return the sorted array
}

// Example usage:
const numbers: number[] = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = bubbleSort(numbers);
console.log(sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]
