function isArraySorted(arr: number[]): boolean {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false; // Found an element that is greater than the next one
        }
    }
    return true; // All elements are in ascending order
}

// Example usage:
const array1 = [1, 2, 3, 4, 5];
const array2 = [5, 3, 4, 1, 2];

console.log(isArraySorted(array1)); // Output: true
console.log(isArraySorted(array2)); // Output: false
