function isArraySortedAscending(arr: number[]): boolean {
    return arr.every((value, index) => {
        if (index === 0) return true; // The first element is always considered sorted
        return value >= arr[index - 1]; // Check if the current element is greater than or equal to the previous one
    });
}

// Example usage:
const sortedArray = [1, 2, 3, 4, 5];
const unsortedArray = [1, 3, 2, 4, 5];

console.log(isArraySortedAscending(sortedArray)); // Output: true
console.log(isArraySortedAscending(unsortedArray)); // Output: false
