function shellSort(arr: number[]): number[] {
    let n = arr.length;

    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {

        // Do a gapped insertion sort
        for (let i = gap; i < n; i++) {
            let temp = arr[i];
            let j = i;

            // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            // Put temp in its correct location
            arr[j] = temp;
        }
    }

    return arr;
}

// Example usage:
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log(shellSort(numbers)); // Output: [11, 12, 22, 25, 34, 64, 90]
