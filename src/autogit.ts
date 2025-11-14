function quicksort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr; // Base case: arrays with 0 or 1 element are already sorted
    }

    const pivot = arr[arr.length - 1]; // Pick the last element as pivot
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quicksort(left), pivot, ...quicksort(right)];
}

// Example usage:
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quicksort(arr)); // [1, 1, 2, 3, 6, 8, 10]
