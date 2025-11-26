function countingSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return [...arr]; // Return copy for empty/single-element arrays
    }

    // Find min and max to determine range
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;

    // Initialize count array and output array
    const count: number[] = new Array(range).fill(0);
    const output: number[] = new Array(arr.length);

    // Step 1: Count frequencies of each number
    for (const num of arr) {
        count[num - min]++;
    }

    // Step 2: Convert counts to cumulative (determine positions)
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build output array in reverse for stability
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const countIndex = num - min;
        output[count[countIndex] - 1] = num;
        count[countIndex]--;
    }

    return output;
}

// Example usage:
const unsortedArray = [4, 2, 2, 8, 3, 3, 1];
const sortedArray = countingSort(unsortedArray);

console.log("Before:", unsortedArray);
console.log("After:", sortedArray);
Before: [4, 2, 2, 8, 3, 3, 1]
After: [1, 2, 2, 3, 3, 4, 8]
