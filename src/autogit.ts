function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Find the maximum number to know number of digits
    const maxNum = Math.max(...arr);
    const maxDigits = Math.floor(Math.log10(maxNum)) + 1;
    
    let result = [...arr];
    
    for (let digit = 0; digit < maxDigits; digit++) {
        // Create buckets for digits 0-9
        const buckets: number[][] = Array.from({ length: 10 }, () => []);
        const divisor = Math.pow(10, digit);
        
        // Place numbers in buckets based on current digit
        for (const num of result) {
            const digitValue = Math.floor(num / divisor) % 10;
            buckets[digitValue].push(num);
        }
        
        // Flatten buckets back into array
        result = ([] as number[]).concat(...buckets);
    }
    
    return result;
}
interface RadixSortOptions {
    base?: number;
    getDigit?: (num: number, digitPlace: number, base: number) => number;
}

function optimizedRadixSort(
    arr: number[], 
    options: RadixSortOptions = {}
): number[] {
    const { base = 10, getDigit = defaultGetDigit } = options;
    
    if (arr.length <= 1) return arr;
    
    const maxNum = Math.max(...arr.map(Math.abs));
    const maxDigits = Math.floor(Math.log(maxNum) / Math.log(base)) + 1;
    
    let result = [...arr];
    
    for (let digit = 0; digit < maxDigits; digit++) {
        const buckets: number[][] = Array.from({ length: base }, () => []);
        const divisor = Math.pow(base, digit);
        
        for (const num of result) {
            const digitValue = getDigit(num, divisor, base);
            buckets[digitValue].push(num);
        }
        
        result = buckets.flat();
    }
    
    return result;
}

function defaultGetDigit(num: number, divisor: number, base: number): number {
    return Math.floor(Math.abs(num) / divisor) % base;
}
function radixSortWithNegatives(arr: number[]): number[] {
    // Separate positive and negative numbers
    const positives = arr.filter(num => num >= 0);
    const negatives = arr.filter(num => num < 0).map(num => -num);
    
    // Sort both separately
    const sortedPositives = radixSort(positives);
    const sortedNegatives = radixSort(negatives).reverse().map(num => -num);
    
    // Combine results
    return [...sortedNegatives, ...sortedPositives];
}
function genericRadixSort<T>(
    arr: T[],
    getKey: (item: T) => number,
    base: number = 10
): T[] {
    if (arr.length <= 1) return arr;
    
    const maxKey = Math.max(...arr.map(item => getKey(item)));
    const maxDigits = Math.floor(Math.log(maxKey) / Math.log(base)) + 1;
    
    let result = [...arr];
    
    for (let digit = 0; digit < maxDigits; digit++) {
        const buckets: T[][] = Array.from({ length: base }, () => []);
        const divisor = Math.pow(base, digit);
        
        for (const item of result) {
            const key = getKey(item);
            const digitValue = Math.floor(Math.abs(key) / divisor) % base;
            buckets[digitValue].push(item);
        }
        
        result = buckets.flat();
    }
    
    return result;
}
class RadixSort {
    static sort(arr: number[], base: number = 10): number[] {
        if (arr.length <= 1) return arr;
        
        const maxNum = Math.max(...arr.map(Math.abs));
        const maxDigits = Math.floor(Math.log(maxNum) / Math.log(base)) + 1;
        
        let result = [...arr];
        
        for (let digit = 0; digit < maxDigits; digit++) {
            const buckets: number[][] = Array.from({ length: base }, () => []);
            const divisor = Math.pow(base, digit);
            
            for (const num of result) {
                const digitValue = Math.floor(Math.abs(num) / divisor) % base;
                buckets[digitValue].push(num);
            }
            
            result = buckets.flat();
        }
        
        return result;
    }
    
    static sortWithNegatives(arr: number[]): number[] {
        const positives = arr.filter(num => num >= 0);
        const negatives = arr.filter(num => num < 0).map(num => -num);
        
        return [
            ...RadixSort.sort(negatives).reverse().map(num => -num),
            ...RadixSort.sort(positives)
        ];
    }
}

// Usage examples
const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
const negativeNumbers = [170, -45, 75, -90, 802, -24, 2, 66];

console.log('Original:', numbers);
console.log('Sorted:', RadixSort.sort(numbers));

console.log('With negatives:', negativeNumbers);
console.log('Sorted with negatives:', RadixSort.sortWithNegatives(negativeNumbers));

// Performance test
const largeArray = Array.from({ length: 10000 }, () => 
    Math.floor(Math.random() * 1000000)
);

console.time('Radix Sort');
const sortedLarge = RadixSort.sort(largeArray);
console.timeEnd('Radix Sort');
// Basic usage
const sorted = radixSort([123, 45, 678, 9, 1000]);

// With custom base (e.g., binary)
const binarySorted = optimizedRadixSort([5, 3, 7, 1], { base: 2 });

// Sorting objects by numeric property
const users = [{ age: 25 }, { age: 30 }, { age: 20 }];
const sortedUsers = genericRadixSort(users, user => user.age);
