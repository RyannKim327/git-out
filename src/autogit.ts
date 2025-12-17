/**
 * Radix sort implementation for positive integers
 */
function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Find the maximum number to know the number of digits
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
}

/**
 * Performs counting sort based on a specific digit
 */
function countingSortByDigit(arr: number[], exp: number): void {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Change count[i] so that count[i] contains the
    // actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy the output array to arr[]
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
/**
 * Enhanced radix sort that handles both positive and negative numbers
 */
function radixSortEnhanced(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Separate positive and negative numbers
    const positiveNumbers: number[] = [];
    const negativeNumbers: number[] = [];
    
    for (const num of arr) {
        if (num >= 0) {
            positiveNumbers.push(num);
        } else {
            negativeNumbers.push(Math.abs(num));
        }
    }
    
    // Sort positive numbers normally
    if (positiveNumbers.length > 0) {
        sortPositiveNumbers(positiveNumbers);
    }
    
    // Sort negative numbers (convert to positive, sort, then reverse and convert back)
    if (negativeNumbers.length > 0) {
        sortPositiveNumbers(negativeNumbers);
        negativeNumbers.reverse();
        for (let i = 0; i < negativeNumbers.length; i++) {
            negativeNumbers[i] = -negativeNumbers[i];
        }
    }
    
    // Combine results
    return [...negativeNumbers, ...positiveNumbers];
}

function sortPositiveNumbers(arr: number[]): void {
    const max = Math.max(...arr);
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
}
/**
 * Generic radix sort that can handle any type with a key extraction function
 */
function genericRadixSort<T>(
    arr: T[],
    keyExtractor: (item: T) => number
): T[] {
    if (arr.length <= 1) return arr;
    
    // Extract keys and find maximum
    const keys = arr.map(keyExtractor);
    const maxKey = Math.max(...keys);
    
    // Create an array of indices to track the original positions
    let indices = arr.map((_, index) => index);
    
    // Perform radix sort on indices based on keys
    for (let exp = 1; Math.floor(maxKey / exp) > 0; exp *= 10) {
        indices = countingSortIndices(indices, keys, exp);
    }
    
    // Rebuild the sorted array using the sorted indices
    return indices.map(index => arr[index]);
}

function countingSortIndices(
    indices: number[],
    keys: number[],
    exp: number
): number[] {
    const n = indices.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(keys[indices[i]] / exp) % 10;
        count[digit]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(keys[indices[i]] / exp) % 10;
        output[count[digit] - 1] = indices[i];
        count[digit]--;
    }
    
    return output;
}
// Test the implementations
function testRadixSort(): void {
    console.log("Testing Radix Sort:");
    
    // Test with positive numbers
    const test1 = [170, 45, 75, 90, 2, 802, 24, 66];
    console.log("Original:", test1);
    console.log("Sorted:", radixSort([...test1]));
    
    // Test with negative numbers
    const test2 = [170, -45, 75, -90, 2, -802, 24, 66];
    console.log("Original with negatives:", test2);
    console.log("Sorted with negatives:", radixSortEnhanced([...test2]));
    
    // Test generic version with objects
    const objects = [
        { name: "Alice", age: 25 },
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 20 }
    ];
    
    console.log("Original objects:", objects);
    console.log("Sorted by age:", genericRadixSort(
        [...objects],
        obj => obj.age
    ));
}

// Performance comparison
function benchmark(): void {
    const largeArray = Array.from({ length: 10000 }, () => 
        Math.floor(Math.random() * 1000000)
    );
    
    console.time("Radix Sort");
    radixSort([...largeArray]);
    console.timeEnd("Radix Sort");
    
    console.time("Built-in Sort");
    [...largeArray].sort((a, b) => a - b);
    console.timeEnd("Built-in Sort");
}

// Run tests
testRadixSort();
benchmark();
