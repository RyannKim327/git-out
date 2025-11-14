function quickSort(arr: number[]): number[] {
    // Base case: arrays with 0 or 1 element are already "sorted"
    if (arr.length <= 1) {
        return arr;
    }

    // Select a pivot element (middle element in this implementation)
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];

    // Partition the array into three sub-arrays
    const less: number[] = [];
    const equal: number[] = [];
    const greater: number[] = [];

    for (const element of arr) {
        if (element < pivot) {
            less.push(element);
        } else if (element === pivot) {
            equal.push(element);
        } else {
            greater.push(element);
        }
    }

    // Recursively sort the partitions and combine results
    return [...quickSort(less), ...equal, ...quickSort(greater)];
}

// Example usage:
const unsortedArray = [9, 3, 7, 4, 6, 1, 2, 8, 5];
const sortedArray = quickSort(unsortedArray);

console.log(sortedArray); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
function genericQuickSort<T>(arr: T[], compare: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const less: T[] = [];
    const equal: T[] = [];
    const greater: T[] = [];
    
    for (const element of arr) {
        const cmp = compare(element, pivot);
        if (cmp < 0) less.push(element);
        else if (cmp === 0) equal.push(element);
        else greater.push(element);
    }
    
    return [
        ...genericQuickSort(less, compare),
        ...equal,
        ...genericQuickSort(greater, compare)
    ];
}

// Example usage with numbers:
genericQuickSort([3, 1, 4, 1, 5], (a, b) => a - b);

// Example usage with custom objects:
genericQuickSort(
    [{age: 30}, {age: 20}, {age: 25}], 
    (a, b) => a.age - b.age
);
