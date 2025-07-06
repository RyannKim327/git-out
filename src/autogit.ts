function countingSort(arr: number[], max: number): number[] {
    // Step 1: Create a count array to store the count of each unique object
    const count: number[] = new Array(max + 1).fill(0);

    // Step 2: Store the count of each number in the count array
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
    }

    // Step 3: Build the output array
    const output: number[] = [];
    for (let i = 0; i <= max; i++) {
        while (count[i] > 0) {
            output.push(i);
            count[i]--;
        }
    }

    return output;
}

// Example usage:
const arr = [4, 2, 2, 8, 3, 3, 1];
const max = Math.max(...arr);
const sortedArr = countingSort(arr, max);
console.log(sortedArr); // Output: [1, 2, 2, 3, 3, 4, 8]
