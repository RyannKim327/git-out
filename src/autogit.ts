function countingSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    // Find the minimum and maximum values in the array
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        min = Math.min(min, arr[i]);
        max = Math.max(max, arr[i]);
    }

    const range = max - min + 1;
    const count: number[] = new Array(range).fill(0);
    const output: number[] = new Array(arr.length);

    // Step 1: Count the frequency of each number
    for (const num of arr) {
        count[num - min]++;
    }

    // Step 2: Convert counts to cumulative sums
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Build the output array (stable sort)
    for (let i = arr.length - 1; i >= 0; i--) {
        const current = arr[i];
        const countIndex = current - min;
        output[count[countIndex] - 1] = current;
        count[countIndex]--;
    }

    return output;
}

// Example usage:
const unsortedArray = [4, 2, -3, 1, 0, -2, 5];
const sortedArray = countingSort(unsortedArray);
console.log(sortedArray); // Output: [-3, -2, 0, 1, 2, 4, 5]
