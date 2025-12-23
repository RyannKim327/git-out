function radixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Find the maximum number to know number of digits
    const max = Math.max(...arr);
    
    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSort(arr, exp);
    }
    
    return arr;
}

function countingSort(arr: number[], exp: number): void {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Change count[i] so that count[i] contains actual
    // position of this digit in output[]
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

// Usage
const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
console.log(radixSort([...numbers])); // [2, 24, 45, 66, 75, 90, 170, 802]
interface RadixSortable {
    value: number;
    original?: any; // For preserving original objects
}

function radixSortGeneric<T>(
    arr: T[],
    getKey: (item: T) => number = (item: T) => item as unknown as number
): T[] {
    if (arr.length <= 1) return arr;
    
    const items: RadixSortable[] = arr.map(item => ({
        value: getKey(item),
        original: item
    }));
    
    const max = Math.max(...items.map(item => item.value));
    
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortGeneric(items, exp);
    }
    
    return items.map(item => item.original as T);
}

function countingSortGeneric(arr: RadixSortable[], exp: number): void {
    const n = arr.length;
    const output = new Array<RadixSortable>(n);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < n; i++) {
        const digit = Math.floor(arr[i].value / exp) % 10;
        count[digit]++;
    }
    
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i].value / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Usage examples
const objects = [
    { id: 1, score: 170 },
    { id: 2, score: 45 },
    { id: 3, score: 75 }
];

const sortedObjects = radixSortGeneric(objects, obj => obj.score);
console.log(sortedObjects);
function radixSortWithNegatives(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    // Separate positive and negative numbers
    const positives: number[] = [];
    const negatives: number[] = [];
    
    for (const num of arr) {
        if (num >= 0) {
            positives.push(num);
        } else {
            negatives.push(-num); // Convert to positive for sorting
        }
    }
    
    // Sort both arrays
    radixSort(positives);
    radixSort(negatives);
    
    // Reverse negatives and convert back to negative
    const sortedNegatives = negatives.reverse().map(n => -n);
    
    return [...sortedNegatives, ...positives];
}

// Usage
const mixedNumbers = [170, -45, 75, -90, 802, -24, 2, 66];
console.log(radixSortWithNegatives(mixedNumbers));
// [-90, -45, -24, 2, 66, 75, 170, 802]
function optimizedRadixSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const hasNegatives = min < 0;
    
    if (hasNegatives) {
        // Add offset to make all numbers positive
        const offset = -min;
        const adjusted = arr.map(n => n + offset);
        const sorted = optimizedRadixSort(adjusted);
        return sorted.map(n => n - offset);
    }
    
    const buckets: number[][] = Array.from({ length: 10 }, () => []);
    let maxDigits = Math.floor(Math.log10(max)) + 1;
    
    for (let digit = 0; digit < maxDigits; digit++) {
        // Distribute numbers into buckets
        for (const num of arr) {
            const currentDigit = Math.floor(num / Math.pow(10, digit)) % 10;
            buckets[currentDigit].push(num);
        }
        
        // Collect numbers from buckets
        arr = ([] as number[]).concat(...buckets);
        
        // Clear buckets for next iteration
        buckets.forEach(bucket => bucket.length = 0);
    }
    
    return arr;
}
class RadixSorter {
    static sort(arr: number[]): number[] {
        return this.radixSort([...arr]);
    }
    
    private static radixSort(arr: number[]): number[] {
        if (arr.length <= 1) return arr;
        
        const max = Math.max(...arr);
        
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            this.countingSort(arr, exp);
        }
        
        return arr;
    }
    
    private static countingSort(arr: number[], exp: number): void {
        const n = arr.length;
        const output = new Array(n);
        const count = new Array(10).fill(0);
        
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
        }
        
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
        }
        
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }
}

// Usage
const sorted = RadixSorter.sort([170, 45, 75, 90, 802, 24, 2, 66]);
console.log(sorted);
