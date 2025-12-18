function radixSortLSD(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Find the maximum number to know number of digits
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    return arr;
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
    
    // Change count[i] so it contains actual position
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy the output array to arr
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}
interface RadixSortOptions {
    getKey?: (item: number) => number;
    base?: number;
}

function radixSort(
    arr: number[], 
    options: RadixSortOptions = {}
): number[] {
    const { getKey = (x: number) => x, base = 10 } = options;
    
    if (arr.length <= 1) return arr;
    
    // Convert to absolute values for negative number handling
    const processed = arr.map(x => getKey(x));
    const max = Math.max(...processed.map(Math.abs));
    
    let sorted = [...arr];
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= base) {
        sorted = countingSortByDigitGeneric(sorted, exp, getKey, base);
    }
    
    return sorted;
}

function countingSortByDigitGeneric(
    arr: number[], 
    exp: number, 
    getKey: (item: number) => number,
    base: number
): number[] {
    const count: number[] = new Array(base).fill(0);
    const output: number[] = new Array(arr.length);
    
    // Count occurrences
    for (const item of arr) {
        const digit = Math.floor(Math.abs(getKey(item)) / exp) % base;
        count[digit]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (backwards for stability)
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(Math.abs(getKey(arr[i])) / exp) % base;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    return output;
}
function radixSortWithNegatives(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Separate positive and negative numbers
    const positives = arr.filter(x => x >= 0);
    const negatives = arr.filter(x => x < 0).map(x => -x);
    
    // Sort both parts
    const sortedPositives = radixSortLSD(positives);
    const sortedNegatives = radixSortLSD(negatives).reverse().map(x => -x);
    
    return [...sortedNegatives, ...sortedPositives];
}
class RadixSorter {
    static sort(arr: number[], handleNegatives: boolean = true): number[] {
        if (handleNegatives) {
            return radixSortWithNegatives(arr);
        }
        return radixSortLSD(arr.filter(x => x >= 0));
    }
    
    // For custom key extraction (useful for objects)
    static sortByKey<T>(
        arr: T[], 
        getKey: (item: T) => number,
        handleNegatives: boolean = true
    ): T[] {
        const keys = arr.map(getKey);
        const sortedIndices = this.getSortedIndices(keys, handleNegatives);
        
        return sortedIndices.map(index => arr[index]);
    }
    
    private static getSortedIndices(arr: number[], handleNegatives: boolean): number[] {
        const indices = arr.map((_, index) => index);
        
        if (handleNegatives) {
            const withNegatives = arr.map((x, i) => ({ value: x, index: i }));
            const sorted = radixSortWithNegatives(arr)
                .map((sortedValue, position) => ({
                    sortedValue,
                    originalIndex: withNegatives.find(x => x.value === sortedValue)?.index || 0
                }));
            
            return sorted.map(x => x.originalIndex);
        }
        
        return indices.sort((a, b) => arr[a] - arr[b]);
    }
}

// Usage Examples
const exampleUsage = () => {
    // Basic usage
    const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
    console.log('Original:', numbers);
    console.log('Sorted:', RadixSorter.sort(numbers));
    
    // With negative numbers
    const withNegatives = [170, -45, 75, -90, 802, -24, 2, 66];
    console.log('With negatives:', RadixSorter.sort(withNegatives));
    
    // Custom key extraction
    const objects = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 20 }
    ];
    
    const sortedByAge = RadixSorter.sortByKey(objects, obj => obj.age);
    console.log('Sorted objects by age:', sortedByAge);
};

// Run example
exampleUsage();
function benchmarkRadixSort(): void {
    const testSizes = [100, 1000, 10000, 100000];
    
    for (const size of testSizes) {
        const testArray = Array.from({ length: size }, () => 
            Math.floor(Math.random() * 1000000)
        );
        
        const start = performance.now();
        RadixSorter.sort(testArray);
        const end = performance.now();
        
        console.log(`Size ${size}: ${(end - start).toFixed(2)}ms`);
    }
}
