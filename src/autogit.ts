function quicksort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: T[] = [];
    const right: T[] = [];
    const equal: T[] = [];

    for (const element of array) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }

    return [...quicksort(left), ...equal, ...quicksort(right)];
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = quicksort(numbers);
console.log(sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = quicksort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]
function quicksortInPlace<T>(array: T[], left: number = 0, right: number = array.length - 1): T[] {
    if (left < right) {
        const pivotIndex = partition(array, left, right);
        quicksortInPlace(array, left, pivotIndex - 1);
        quicksortInPlace(array, pivotIndex + 1, right);
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
quicksortInPlace(numbers);
console.log(numbers); // [11, 12, 22, 25, 34, 64, 90]
function quicksortWithComparator<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: T[] = [];
    const right: T[] = [];
    const equal: T[] = [];

    for (const element of array) {
        const comparison = compareFn(element, pivot);
        if (comparison < 0) {
            left.push(element);
        } else if (comparison > 0) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }

    return [
        ...quicksortWithComparator(left, compareFn),
        ...equal,
        ...quicksortWithComparator(right, compareFn)
    ];
}

// Usage examples with custom comparators
const numbers = [64, 34, 25, 12, 22, 11, 90];

// Descending order
const descending = quicksortWithComparator(numbers, (a, b) => b - a);
console.log(descending); // [90, 64, 34, 25, 22, 12, 11]

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

const sortedByAge = quicksortWithComparator(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name: "Bob", age: 25}, {name: "Alice", age: 30}, {name: "Charlie", age: 35}]
function quicksortOptimized<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    // Choose random pivot for better average performance
    const pivotIndex = Math.floor(Math.random() * array.length);
    const pivot = array[pivotIndex];
    
    const left: T[] = [];
    const right: T[] = [];
    const equal: T[] = [];

    for (const element of array) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }

    return [...quicksortOptimized(left), ...equal, ...quicksortOptimized(right)];
}
class QuickSort<T> {
    private array: T[];

    constructor(array: T[]) {
        this.array = [...array]; // Create a copy to avoid mutating original
    }

    sort(compareFn?: (a: T, b: T) => number): T[] {
        return this.quicksort(this.array, compareFn);
    }

    private quicksort(
        array: T[], 
        compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
    ): T[] {
        if (array.length <= 1) {
            return array;
        }

        const pivot = array[Math.floor(array.length / 2)];
        const left: T[] = [];
        const right: T[] = [];
        const equal: T[] = [];

        for (const element of array) {
            const comparison = compareFn(element, pivot);
            if (comparison < 0) {
                left.push(element);
            } else if (comparison > 0) {
                right.push(element);
            } else {
                equal.push(element);
            }
        }

        return [
            ...this.quicksort(left, compareFn),
            ...equal,
            ...this.quicksort(right, compareFn)
        ];
    }
}

// Usage
const sorter = new QuickSort([64, 34, 25, 12, 22, 11, 90]);
const sorted = sorter.sort();
console.log(sorted); // [11, 12, 22, 25, 34, 64, 90]
