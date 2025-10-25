function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;

    // Step 1: Initialize counts array
    const counts = new Array<number>(range).fill(0);

    // Step 2: Count occurrences
    for (const num of arr) {
        counts[num - min]++;
    }

    // Step 3: Accumulate counts
    for (let i = 1; i < counts.length; i++) {
        counts[i] += counts[i - 1];
    }

    // Step 4: Build output array (stable sort: iterate backwards)
    const output = new Array<number>(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        counts[num - min]--;
        output[counts[num - min]] = num;
    }

    return output;
}

// Example usage:
console.log(countingSort([4, 2, 2, 8, 3, 3, 1]));
// Output: [1, 2, 2, 3, 3, 4, 8]
