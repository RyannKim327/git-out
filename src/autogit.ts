function radixSortLSD(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Get maximum number to determine number of digits
    const maxNum = Math.max(...arr.map(num => Math.abs(num)));
    const maxDigits = Math.floor(Math.log10(maxNum)) + 1;
    
    let result = [...arr];
    
    // Perform counting sort for each digit
    for (let digitPlace = 0; digitPlace < maxDigits; digitPlace++) {
        result = countingSortByDigit(result, digitPlace);
    }
    
    return result;
}

function countingSortByDigit(arr: number[], digitPlace: number): number[] {
    const count = new Array(10).fill(0);
    const output = new Array(arr.length);
    const digitBase = Math.pow(10, digitPlace);
    
    // Count occurrences of each digit
    for (const num of arr) {
        const digit = Math.floor(Math.abs(num) / digitBase) % 10;
        count[digit]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(Math.abs(arr[i]) / digitBase) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    return output;
}
function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Separate positive and negative numbers
    const negatives = arr.filter(num => num < 0).map(num => Math.abs(num));
    const positives = arr.filter(num => num >= 0);
    
    // Sort both parts
    const sortedNegatives = radixSortLSD(negatives).reverse().map(num => -num);
    const sortedPositives = radixSortLSD(positives);
    
    return [...sortedNegatives, ...sortedPositives];
}
function radixSortGeneric(
    arr: number[], 
    radix: number = 10, 
    signed: boolean = true
): number[] {
    if (arr.length <= 1) return arr;
    
    if (signed) {
        const negatives = arr.filter(num => num < 0).map(num => Math.abs(num));
        const positives = arr.filter(num => num >= 0);
        
        const sortedNegatives = radixSortLSDGeneric(negatives, radix)
            .reverse()
            .map(num => -num);
        const sortedPositives = radixSortLSDGeneric(positives, radix);
        
        return [...sortedNegatives, ...sortedPositives];
    }
    
    return radixSortLSDGeneric(arr, radix);
}

function radixSortLSDGeneric(arr: number[], radix: number = 10): number[] {
    if (arr.length <= 1) return arr;
    
    const maxNum = Math.max(...arr);
    let maxDigits = 0;
    let temp = maxNum;
    
    while (temp > 0) {
        maxDigits++;
        temp = Math.floor(temp / radix);
    }
    
    let result = [...arr];
    
    for (let digitPlace = 0; digitPlace < maxDigits; digitPlace++) {
        result = countingSortByDigitGeneric(result, digitPlace, radix);
    }
    
    return result;
}

function countingSortByDigitGeneric(
    arr: number[], 
    digitPlace: number, 
    radix: number
): number[] {
    const count = new Array(radix).fill(0);
    const output = new Array(arr.length);
    const digitBase = Math.pow(radix, digitPlace);
    
    for (const num of arr) {
        const digit = Math.floor(num / digitBase) % radix;
        count[digit]++;
    }
    
    for (let i = 1; i < radix; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / digitBase) % radix;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    return output;
}
// Test the implementations
const testArray = [170, 45, 75, -90, 802, 24, 2, -66, 0];
const testArray2 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

console.log("Original array:", testArray);
console.log("LSD Radix Sort:", radixSortLSD([...testArray]));
console.log("Full Radix Sort:", radixSort([...testArray]));
console.log("Generic Radix Sort:", radixSortGeneric([...testArray], 10, true));

console.log("\nTest array 2:", testArray2);
console.log("Generic Radix Sort (radix 16):", radixSortGeneric([...testArray2], 16, false));
// Utility function to measure performance
function measurePerformance(
    sortFunction: (arr: number[]) => number[], 
    arr: number[], 
    name: string
): void {
    const start = performance.now();
    const result = sortFunction([...arr]);
    const end = performance.now();
    
    console.log(`${name}: ${(end - start).toFixed(3)}ms`);
    console.log("Sorted:", result.slice(0, 10), "...");
}

// Performance comparison
const largeArray = Array.from({ length: 10000 }, () => 
    Math.floor(Math.random() * 1000000) - 500000
);

console.log("Performance Comparison:");
measurePerformance(radixSortLSD, largeArray, "LSD Only");
measurePerformance(radixSort, largeArray, "Full Radix Sort");
measurePerformance((arr) => [...arr].sort((a, b) => a - b), largeArray, "Native Sort");
