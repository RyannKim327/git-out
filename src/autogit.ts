// Helper function: Counting Sort for a specific digit position
function countingSort(arr: number[], exp: number): number[] {
    const n = arr.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0); // Digits 0-9
    
    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Change count[i] to cumulative sum
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    return output;
}

// Main Radix Sort function
function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Find the maximum number to determine number of digits
    let max = Math.max(...arr);
    
    // Do counting sort for every digit (from least significant to most)
    let exp = 1;
    while (Math.floor(max / exp) > 0) {
        arr = countingSort(arr, exp);
        exp *= 10;
    }
    
    return arr;
}

// Example usage and testing
function testRadixSort() {
    const arr = [170, 45, 75, 90, 802, 24, 2, 66];
    console.log("Original array:", arr);
    
    const sorted = radixSort(arr);
    console.log("Sorted array:", sorted);
    
    // Verify sorting
    const isSorted = sorted.every((item, index) => 
        index === 0 || sorted[index - 1] <= item
    );
    console.log("Array is sorted:", isSorted);
}

// Run the test
testRadixSort();
function radixSortWithNegatives(arr: number[]): number[] {
    const negatives: number[] = [];
    const positives: number[] = [];
    
    // Separate negatives and positives
    for (const num of arr) {
        if (num < 0) {
            negatives.push(Math.abs(num));
        } else {
            positives.push(num);
        }
    }
    
    // Sort both groups
    const sortedNegatives = radixSort(negatives);
    const sortedPositives = radixSort(positives);
    
    // Merge results (negatives first, then positives)
    const result: number[] = [];
    for (let i = sortedNegatives.length - 1; i >= 0; i--) {
        result.push(-sortedNegatives[i]);
    }
    for (const num of sortedPositives) {
        result.push(num);
    }
    
    return result;
}
