function quickSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];
    const left: T[] = [];
    const right: T[] = [];

    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = quickSort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = quickSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]
function quickSortInPlace<T>(array: T[], left: number = 0, right: number = array.length - 1): T[] {
    if (left < right) {
        const pivotIndex = partition(array, left, right);
        quickSortInPlace(array, left, pivotIndex - 1);
        quickSortInPlace(array, pivotIndex + 1, right);
    }
    return array;
}

function partition<T>(array: T[], left: number, right: number): number {
    const pivot = array[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    return i + 1;
}

// Usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
quickSortInPlace(numbers);
console.log(numbers); // [11, 12, 22, 25, 34, 64, 90]
function quickSortGeneric<T>(
    array: T[],
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[0];
    const left: T[] = [];
    const right: T[] = [];

    for (let i = 1; i < array.length; i++) {
        if (compareFn(array[i], pivot) < 0) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    return [...quickSortGeneric(left, compareFn), pivot, ...quickSortGeneric(right, compareFn)];
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = quickSortGeneric(numbers);
console.log(sortedNumbers);

// Custom comparator for descending order
const descendingNumbers = quickSortGeneric(numbers, (a, b) => b - a);
console.log(descendingNumbers); // [90, 64, 34, 25, 22, 12, 11]

// Sorting objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = quickSortGeneric(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
function quickSortOptimized<T>(
    array: T[],
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const stack: [number, number][] = [];
    let left = 0;
    let right = array.length - 1;
    
    stack.push([left, right]);
    
    while (stack.length) {
        [left, right] = stack.pop()!;
        
        if (left >= right) continue;
        
        const pivotIndex = partitionOptimized(array, left, right, compareFn);
        
        // Push the larger partition first to minimize stack depth
        if (pivotIndex - left > right - pivotIndex) {
            stack.push([left, pivotIndex - 1]);
            stack.push([pivotIndex + 1, right]);
        } else {
            stack.push([pivotIndex + 1, right]);
            stack.push([left, pivotIndex - 1]);
        }
    }
    
    return array;
}

function partitionOptimized<T>(
    array: T[],
    left: number,
    right: number,
    compareFn: (a: T, b: T) => number
): number {
    const pivot = array[Math.floor((left + right) / 2)]; // Middle element as pivot
    let i = left;
    let j = right;
    
    while (i <= j) {
        while (compareFn(array[i], pivot) < 0) i++;
        while (compareFn(array[j], pivot) > 0) j--;
        
        if (i <= j) {
            [array[i], array[j]] = [array[j], array[i]];
            i++;
            j--;
        }
    }
    
    return i - 1;
}
class QuickSorter<T> {
    private compareFn: (a: T, b: T) => number;
    
    constructor(compareFn?: (a: T, b: T) => number) {
        this.compareFn = compareFn || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
    }
    
    sort(array: T[]): T[] {
        if (!Array.isArray(array)) {
            throw new Error('Input must be an array');
        }
        
        if (array.length <= 1) {
            return [...array]; // Return a copy
        }
        
        return this.quickSortRecursive([...array]); // Work on a copy
    }
    
    private quickSortRecursive(array: T[]): T[] {
        if (array.length <= 1) return array;
        
        const pivot = array[0];
        const left: T[] = [];
        const right: T[] = [];
        
        for (let i = 1; i < array.length; i++) {
            if (this.compareFn(array[i], pivot) < 0) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }
        
        return [
            ...this.quickSortRecursive(left),
            pivot,
            ...this.quickSortRecursive(right)
        ];
    }
}

// Usage
const sorter = new QuickSorter<number>();
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sorted = sorter.sort(numbers);
console.log(sorted);
