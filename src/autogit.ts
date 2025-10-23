function countingSort(arr: number[]): number[] {
    if (arr.length <= 1) return [...arr];
    
    // Find the maximum value to determine the range
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    
    // Create count array with proper size
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    // Count occurrences of each element
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        const pos = count[num - min] - 1;
        output[pos] = num;
        count[num - min]--;
    }
    
    return output;
}
interface Sortable {
    value: number;
    [key: string]: any;
}

function countingSortGeneric<T extends Sortable>(
    arr: T[], 
    getValue: (item: T) => number = (item) => item.value
): T[] {
    if (arr.length <= 1) return [...arr];
    
    // Extract values using the getValue function
    const values = arr.map(getValue);
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (const item of arr) {
        count[getValue(item) - min]++;
    }
    
    // Calculate cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array (stable sort)
    const output = new Array(arr.length);
    for (let i = arr.length - 1; i >= 0; i--) {
        const item = arr[i];
        const value = getValue(item);
        const pos = count[value - min] - 1;
        output[pos] = item;
        count[value - min]--;
    }
    
    return output;
}
function countingSortInPlace(arr: number[]): void {
    if (arr.length <= 1) return;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    
    // Count occurrences
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Reconstruct array in sorted order
    let index = 0;
    for (let i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[index++] = i + min;
            count[i]--;
        }
    }
}
// Example 1: Basic usage
const numbers = [4, 2, 2, 8, 3, 3, 1];
console.log('Original:', numbers);
console.log('Sorted:', countingSort(numbers));

// Example 2: With negative numbers
const negativeNumbers = [-5, -2, 4, -8, 0, 2];
console.log('With negatives:', countingSort(negativeNumbers));

// Example 3: Generic version with objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 },
    { name: 'Diana', age: 22 }
];

const sortedByAge = countingSortGeneric(people, person => person.age);
console.log('Sorted by age:', sortedByAge);

// Example 4: In-place sorting
const mutableArray = [5, 3, 8, 1, 2];
console.log('Before in-place:', mutableArray);
countingSortInPlace(mutableArray);
console.log('After in-place:', mutableArray);
// Jest-style tests for the counting sort implementation
describe('Counting Sort', () => {
    test('sorts positive numbers', () => {
        const input = [4, 2, 2, 8, 3, 3, 1];
        const expected = [1, 2, 2, 3, 3, 4, 8];
        expect(countingSort(input)).toEqual(expected);
    });
    
    test('sorts with negative numbers', () => {
        const input = [-5, -2, 4, -8, 0, 2];
        const expected = [-8, -5, -2, 0, 2, 4];
        expect(countingSort(input)).toEqual(expected);
    });
    
    test('handles empty array', () => {
        expect(countingSort([])).toEqual([]);
    });
    
    test('handles single element', () => {
        expect(countingSort([5])).toEqual([5]);
    });
    
    test('generic version sorts objects', () => {
        const input = [{ value: 3 }, { value: 1 }, { value: 2 }];
        const expected = [{ value: 1 }, { value: 2 }, { value: 3 }];
        expect(countingSortGeneric(input)).toEqual(expected);
    });
});
