const numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 1, 2, 3, 4, 5, 6, 9]
const numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6];
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 6, 5, 4, 3, 2, 1, 1]
function sortNumbersAscending(arr: number[]): number[] {
    return [...arr].sort((a, b) => a - b); // Creates a new array
}

function sortNumbersDescending(arr: number[]): number[] {
    return [...arr].sort((a, b) => b - a);
}

const numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6];
const sortedAsc = sortNumbersAscending(numbers);
const sortedDesc = sortNumbersDescending(numbers);
function sortArray<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number,
    descending: boolean = false
): T[] {
    const result = [...arr];
    if (descending) {
        return result.sort((a, b) => compareFn(b, a));
    }
    return result.sort(compareFn);
}

// Usage
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
const sortedNumbers = sortArray(numbers, (a, b) => a - b, true);
interface SortableNumberArray {
    numbers: number[];
    sort(ascending?: boolean): number[];
}

class NumberSorter implements SortableNumberArray {
    constructor(public numbers: number[]) {}
    
    sort(ascending: boolean = true): number[] {
        const result = [...this.numbers];
        if (ascending) {
            return result.sort((a, b) => a - b);
        }
        return result.sort((a, b) => b - a);
    }
}

// Usage
const sorter = new NumberSorter([3, 1, 4, 1, 5, 9, 2, 6]);
console.log(sorter.sort());      // Ascending
console.log(sorter.sort(false)); // Descending
// Sort by absolute value
const numbers = [-3, 1, -4, 1, 5, -9, 2, 6];
numbers.sort((a, b) => Math.abs(a) - Math.abs(b));
console.log(numbers); // [1, 1, 2, -3, -4, 5, 6, -9]

// Sort by even/odd then value
numbers.sort((a, b) => {
    const aEven = a % 2 === 0;
    const bEven = b % 2 === 0;
    
    if (aEven !== bEven) {
        return aEven ? -1 : 1; // Even numbers first
    }
    return a - b; // Then sort by value
});
