function radixSortLSD(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Get the maximum number to determine the number of digits
    const maxNum = Math.max(...arr);
    const maxDigitCount = Math.floor(Math.log10(maxNum)) + 1;
    
    // Create a copy to avoid mutating the original array
    let sortedArray = [...arr];
    
    // Perform counting sort for each digit position
    for (let digitPos = 0; digitPos < maxDigitCount; digitPos++) {
        const buckets: number[][] = Array.from({ length: 10 }, () => []);
        
        // Distribute numbers into buckets based on current digit
        for (const num of sortedArray) {
            const digit = Math.floor(num / Math.pow(10, digitPos)) % 10;
            buckets[digit].push(num);
        }
        
        // Collect numbers from buckets in order
        sortedArray = ([] as number[]).concat(...buckets);
    }
    
    return sortedArray;
}
function radixSortMSD(arr: number[], digitPos?: number): number[] {
    if (arr.length <= 1) return arr;
    
    // Set initial digit position if not provided
    if (digitPos === undefined) {
        const maxNum = Math.max(...arr);
        digitPos = Math.floor(Math.log10(maxNum));
    }
    
    // Base case: if no more digits to process, return
    if (digitPos < 0) return arr;
    
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    
    // Distribute numbers into buckets
    for (const num of arr) {
        const digit = Math.floor(num / Math.pow(10, digitPos)) % 10;
        buckets[digit].push(num);
    }
    
    // Recursively sort each bucket and concatenate results
    const result: number[] = [];
    for (let i = 0; i < 10; i++) {
        if (buckets[i].length > 0) {
            const sortedBucket = radixSortMSD(buckets[i], digitPos - 1);
            result.push(...sortedBucket);
        }
    }
    
    return result;
}
function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Separate positive and negative numbers
    const positive: number[] = [];
    const negative: number[] = [];
    
    for (const num of arr) {
        if (num >= 0) {
            positive.push(num);
        } else {
            negative.push(Math.abs(num));
        }
    }
    
    // Sort positive numbers using LSD radix sort
    const sortedPositive = radixSortLSD(positive);
    
    // Sort negative numbers (convert back to negative)
    const sortedNegative = radixSortLSD(negative).reverse().map(n => -n);
    
    return [...sortedNegative, ...sortedPositive];
}

// Helper function for LSD radix sort (as shown above)
function radixSortLSD(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const maxNum = Math.max(...arr);
    const maxDigitCount = Math.floor(Math.log10(maxNum)) + 1;
    
    let sortedArray = [...arr];
    
    for (let digitPos = 0; digitPos < maxDigitCount; digitPos++) {
        const buckets: number[][] = Array.from({ length: 10 }, () => []);
        
        for (const num of sortedArray) {
            const digit = Math.floor(num / Math.pow(10, digitPos)) % 10;
            buckets[digit].push(num);
        }
        
        sortedArray = ([] as number[]).concat(...buckets);
    }
    
    return sortedArray;
}
// Test the implementation
const testArray = [170, 45, 75, 90, 802, 24, 2, 66];
const sortedArray = radixSort(testArray);

console.log("Original:", testArray);
console.log("Sorted:", sortedArray);

// Test with negative numbers
const testWithNegatives = [170, -45, 75, -90, 802, 24, -2, 66];
const sortedWithNegatives = radixSort(testWithNegatives);

console.log("Original with negatives:", testWithNegatives);
console.log("Sorted with negatives:", sortedWithNegatives);
