function countingSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    // Find min and max to handle negative numbers
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    
    // Initialize count array with zeros
    const count = new Array(range).fill(0);
    const output = new Array(arr.length).fill(0);

    // Store count of each element
    for (const num of arr) {
        count[num - min]++;
    }

    // Change count[i] to cumulative count (prefix sum)
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array (reverse iteration for stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const position = count[num - min] - 1;
        output[position] = num;
        count[num - min]--;
    }

    return output;
}

// Example usage:
const unsortedArray = [4, 2, -3, 1, -1, 0, -4, 5];
const sortedArray = countingSort(unsortedArray);
console.log(sortedArray); // Output: [-4, -3, -1, 0, 1, 2, 4, 5]
