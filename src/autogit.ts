function shellSort(arr: number[]): number[] {
    // Create a copy of the input array to avoid mutating the original
    const array = [...arr];
    // Start with a large gap and reduce it over time
    let gap = Math.floor(array.length / 2);

    while (gap > 0) {
        // Perform insertion sort on the subarrays defined by the current gap
        for (let i = gap; i < array.length; i++) {
            const currentElement = array[i]; // Current element to be inserted
            let j = i; // Start comparing elements `gap` positions behind

            // Shift elements until correct position is found
            while (j >= gap && array[j - gap] > currentElement) {
                array[j] = array[j - gap];
                j -= gap;
            }

            // Insert the current element in its correct position
            array[j] = currentElement;
        }

        // Reduce the gap (using Shell's original sequence)
        gap = Math.floor(gap / 2);
    }

    return array;
}
const unsortedArray = [9, 8, 3, 7, 5, 6, 4, 1];
const sortedArray = shellSort(unsortedArray);

console.log(sortedArray); // [1, 3, 4, 5, 6, 7, 8, 9]
console.log(unsortedArray); // Original array remains unchanged (due to copy)
