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

    // Concatenate remaining elements (if any)
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function mergeSort(arr: number[]): number[] {
    // Base case: array is empty or single element
    if (arr.length <= 1) {
        return arr;
    }

    // Split array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort and merge
    return merge(mergeSort(left), mergeSort(right));
}
const unsortedArray = [38, 27, 43, 3, 9, 82, 10];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // [3, 9, 10, 27, 38, 43, 82]
function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => boolean): T[] {
    /* ...use compare(a, b) instead of a < b... */
}

function mergeSort<T>(arr: T[], compare = (a: T, b: T) => a < b): T[] { ... }
