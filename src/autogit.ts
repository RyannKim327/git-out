function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Find the maximum number to know number of digits
    const maxNum = Math.max(...arr);
    const maxDigits = maxNum.toString().length;
    
    let sortedArray = [...arr];
    
    // Perform counting sort for every digit
    for (let digit = 0; digit < maxDigits; digit++) {
        // Create 10 buckets (0-9)
        const buckets: number[][] = Array.from({ length: 10 }, () => []);
        
        // Place numbers in buckets based on current digit
        for (let i = 0; i < sortedArray.length; i++) {
            const num = sortedArray[i];
            const digitValue = getDigit(num, digit);
            buckets[digitValue].push(num);
        }
        
        // Flatten buckets back into array
        sortedArray = ([] as number[]).concat(...buckets);
    }
    
    return sortedArray;
}

// Helper function to get digit at specific position
function getDigit(num: number, place: number): number {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
function radixSortEfficient(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const maxNum = Math.max(...arr);
    const maxDigits = Math.floor(Math.log10(maxNum)) + 1;
    
    let sortedArray = [...arr];
    
    for (let digit = 0; digit < maxDigits; digit++) {
        const count = new Array(10).fill(0);
        const output = new Array(arr.length);
        
        // Count occurrences of each digit
        for (let i = 0; i < sortedArray.length; i++) {
            const digitValue = getDigit(sortedArray[i], digit);
            count[digitValue]++;
        }
        
        // Calculate cumulative count
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output array
        for (let i = sortedArray.length - 1; i >= 0; i--) {
            const digitValue = getDigit(sortedArray[i], digit);
            output[count[digitValue] - 1] = sortedArray[i];
            count[digitValue]--;
        }
        
        sortedArray = output;
    }
    
    return sortedArray;
}
function radixSortWithNegatives(arr: number[]): number[] {
    // Separate positive and negative numbers
    const negatives = arr.filter(num => num < 0);
    const positives = arr.filter(num => num >= 0);
    
    // Reverse negatives to make them positive and sort
    const reversedNegatives = negatives.map(num => Math.abs(num));
    const sortedNegatives = radixSortEfficient(reversedNegatives)
        .reverse()
        .map(num => -num);
    
    // Sort positives normally
    const sortedPositives = radixSortEfficient(positives);
    
    return [...sortedNegatives, ...sortedPositives];
}
// Helper function to get digit at specific position
function getDigit(num: number, place: number): number {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// Main radix sort implementation
function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const maxNum = Math.max(...arr.map(Math.abs));
    const maxDigits = Math.floor(Math.log10(maxNum)) + 1;
    
    let sortedArray = [...arr];
    
    for (let digit = 0; digit < maxDigits; digit++) {
        const buckets: number[][] = Array.from({ length: 10 }, () => []);
        
        for (let i = 0; i < sortedArray.length; i++) {
            const digitValue = getDigit(sortedArray[i], digit);
            buckets[digitValue].push(sortedArray[i]);
        }
        
        sortedArray = ([] as number[]).concat(...buckets);
    }
    
    return sortedArray;
}

// Test the implementation
const testArrays = [
    [170, 45, 75, 90, 802, 24, 2, 66],
    [3, 7, 1, 9, 2, 8, 5, 4, 6],
    [100, 10, 1, 1000],
    [5, 4, 3, 2, 1],
    [1],
    []
];

testArrays.forEach((arr, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Input:  [${arr.join(', ')}]`);
    console.log(`Sorted: [${radixSort(arr).join(', ')}]`);
    console.log('---');
});
const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
const sorted = radixSort(numbers);
console.log(sorted); // [2, 24, 45, 66, 75, 90, 170, 802]
