function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Find the maximum number to know number of digits
    const maxNum = Math.max(...arr);
    
    // Do counting sort for every digit
    let exp = 1;
    const result = [...arr];
    
    while (Math.floor(maxNum / exp) > 0) {
        countingSortByDigit(result, exp);
        exp *= 10;
    }
    
    return result;
}

function countingSortByDigit(arr: number[], exp: number): void {
    const n = arr.length;
    const output: number[] = new Array(n);
    const count: number[] = new Array(10).fill(0);
    
    // Store count of occurrences
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Change count[i] so that it contains actual position
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

// Alternative implementation using buckets (more intuitive approach)
function radixSortWithBuckets(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const maxNum = Math.max(...arr);
    let exp = 1;
    
    while (Math.floor(maxNum / exp) > 0) {
        const buckets: number[][] = Array.from({ length: 10 }, () => []);
        
        // Place numbers in buckets based on current digit
        for (const num of arr) {
            const digit = Math.floor(num / exp) % 10;
            buckets[digit].push(num);
        }
        
        // Flatten buckets back into array
        arr = ([] as number[]).concat(...buckets);
        exp *= 10;
    }
    
    return arr;
}

// Generic version with custom radix (base)
function radixSortGeneric(arr: number[], radix: number = 10): number[] {
    if (arr.length <= 1) return arr;
    
    const maxNum = Math.max(...arr);
    let exp = 1;
    
    while (Math.floor(maxNum / exp) > 0) {
        const buckets: number[][] = Array.from({ length: radix }, () => []);
        
        for (const num of arr) {
            const digit = Math.floor(num / exp) % radix;
            buckets[digit].push(num);
        }
        
        arr = ([] as number[]).concat(...buckets);
        exp *= radix;
    }
    
    return arr;
}

// Example usage and testing
const testArray = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Original array:", testArray);
console.log("Sorted (counting sort):", radixSort(testArray));
console.log("Sorted (bucket method):", radixSortWithBuckets(testArray));
console.log("Sorted (generic radix 10):", radixSortGeneric(testArray));

// For negative numbers (extended version)
function radixSortWithNegatives(arr: number[]): number[] {
    const negatives = arr.filter(n => n < 0).map(n => -n);
    const positives = arr.filter(n => n >= 0);
    
    return [
        ...radixSort(negatives).reverse().map(n => -n),
        ...radixSort(positives)
    ];
}

const testWithNegatives = [170, -45, 75, -90, 802, 24, -2, 66];
console.log("With negatives:", radixSortWithNegatives(testWithNegatives));
