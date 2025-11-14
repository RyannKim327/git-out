function countingSort(arr: number[]): number[] {
    if (arr.length === 0) return arr;
    
    // Find min and max values
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    // Create count array
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Reconstruct sorted array
    const result: number[] = [];
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            result.push(i + min);
            count[i]--;
        }
    }
    
    return result;
}

// Example usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
console.log(countingSort(numbers)); // [1, 2, 2, 3, 3, 4, 8]
interface CountingSortable {
    key: number;
    // Add other properties if needed
}

function countingSortGeneric<T extends CountingSortable>(
    arr: T[], 
    keyFn: (item: T) => number = (item) => item.key
): T[] {
    if (arr.length === 0) return arr;
    
    // Extract keys
    const keys = arr.map(keyFn);
    const max = Math.max(...keys);
    const min = Math.min(...keys);
    const range = max - min + 1;
    
    // Count occurrences
    const count = new Array(range).fill(0);
    for (const key of keys) {
        count[key - min]++;
    }
    
    // Calculate positions
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const key = keyFn(arr[i]);
        output[count[key - min] - 1] = arr[i];
        count[key - min]--;
    }
    
    return output;
}

// Example usage with objects
const objects = [
    { key: 4, name: "Alice" },
    { key: 2, name: "Bob" },
    { key: 2, name: "Charlie" },
    { key: 8, name: "Diana" }
];

const sorted = countingSortGeneric(objects, obj => obj.key);
console.log(sorted);
function countingSortChars(str: string): string {
    const arr = str.split('');
    const max = Math.max(...arr.map(char => char.charCodeAt(0)));
    const min = Math.min(...arr.map(char => char.charCodeAt(0)));
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    for (const char of arr) {
        count[char.charCodeAt(0) - min]++;
    }
    
    let result = '';
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            result += String.fromCharCode(i + min);
            count[i]--;
        }
    }
    
    return result;
}

// Example usage
console.log(countingSortChars("typescript")); // "ceipprstty"
