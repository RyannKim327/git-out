function mergeSort(array: number[]): number[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (array.length <= 1) return array;

    // Split the array into two halves
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    // Recursively sort and merge
    return merge(mergeSort(left), mergeSort(right));
}

// Helper function to merge two sorted arrays
function merge(left: number[], right: number[]): number[] {
    let result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Compare elements and merge
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Append remaining elements from either array
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
const unsortedArray = [9, 3, 7, 5, 6, 4, 8, 2];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // Output: [2, 3, 4, 5, 6, 7, 8, 9]
function genericMergeSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
    // ... same implementation using comparator instead of < operator
}

// Example usage with objects:
const users = [{ age: 25 }, { age: 30 }, { age: 20 }];
const sortedUsers = genericMergeSort(users, (a, b) => a.age - b.age);
