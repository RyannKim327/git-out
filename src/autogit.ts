function shellSort(arr: number[]): number[] {
    const n = arr.length;

    // Start with a big gap, then reduce the gap
    let gap = Math.floor(n / 2); // Initial gap

    // Do a gapped insertion sort for this gap size
    while (gap > 0) {
        // Perform a gapped insertion sort
        for (let i = gap; i < n; i++) {
            // Save the current element in a variable
            const temp = arr[i];

            // Shift earlier gap-sorted elements up until the correct location for temp is found
            let j: number;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }

            // Put temp (the original arr[i]) in its correct location
            arr[j] = temp;
        }
        
        // Reduce the gap for the next element
        gap = Math.floor(gap / 2);
    }

    return arr;
}

// Example usage
const array = [12, 34, 54, 2, 3];
console.log("Original array:", array);
const sortedArray = shellSort(array);
console.log("Sorted array:", sortedArray);
