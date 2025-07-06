function quicksort(arr: number[]): number[] {
    // Base case: arrays with 0 or 1 element are sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Choose a pivot (using the last element here)
    const pivot = arr[arr.length - 1];
    const left: number[] = [];
    const right: number[] = [];

    // Partitioning
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    // Recursively apply quicksort to left and right, and combine with pivot
    return [...quicksort(left), pivot, ...quicksort(right)];
}

// Example usage
const arrayToSort = [3, 6, 8, 10, 1, 2, 1];
const sortedArray = quicksort(arrayToSort);
console.log(sortedArray); // Output: [1, 1, 2, 3, 6, 8, 10]
