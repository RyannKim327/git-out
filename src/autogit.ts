function quickSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    // Random pivot selection to avoid worst-case scenarios
    const pivotIndex = Math.floor(Math.random() * array.length);
    const pivot = array[pivotIndex];

    const less: T[] = [];
    const equal: T[] = [];
    const greater: T[] = [];

    // Partition elements around the pivot
    for (const element of array) {
        if (element < pivot) {
            less.push(element);
        } else if (element === pivot) {
            equal.push(element);
        } else {
            greater.push(element);
        }
    }

    // Recursively sort sub-arrays and combine results
    return [
        ...quickSort(less),
        ...equal,
        ...quickSort(greater)
    ];
}

// Example usage:
const unsortedArray = [9, 3, 7, 4, 6, 1, 2, 8, 5];
const sortedArray = quickSort(unsortedArray);

console.log("Unsorted Array:", unsortedArray);
console.log("Sorted Array:  ", sortedArray);
