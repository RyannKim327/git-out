function quicksort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quicksort(left), pivot, ...quicksort(right)];
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sorted = quicksort(numbers);
console.log(sorted); // [1, 1, 2, 3, 6, 8, 10]
function quicksortGeneric<T>(arr: T[]): T[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left: T[] = [];
    const right: T[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quicksortGeneric(left), pivot, ...quicksortGeneric(right)];
}

// Usage with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
const sortedStrings = quicksortGeneric(strings);
console.log(sortedStrings); // ['apple', 'banana', 'cherry', 'date']
function quicksortInPlace(arr: number[], low: number = 0, high: number = arr.length - 1): void {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quicksortInPlace(arr, low, pivotIndex - 1);
        quicksortInPlace(arr, pivotIndex + 1, high);
    }
}

function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Usage
const numbers = [3, 6, 8, 10, 1, 2, 1];
quicksortInPlace(numbers);
console.log(numbers); // [1, 1, 2, 3, 6, 8, 10]
function quicksortWithComparator<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left: T[] = [];
    const right: T[] = [];

    for (let i = 1; i < arr.length; i++) {
        if (comparator(arr[i], pivot) < 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [
        ...quicksortWithComparator(left, comparator),
        pivot,
        ...quicksortWithComparator(right, comparator)
    ];
}

// Usage with descending order
const numbers = [3, 6, 8, 10, 1, 2, 1];
const descendingComparator = (a: number, b: number) => b - a;
const sortedDescending = quicksortWithComparator(numbers, descendingComparator);
console.log(sortedDescending); // [10, 8, 6, 3, 2, 1, 1]

// Usage with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 20 }
];

const sortedByAge = quicksortWithComparator(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
class QuickSorter<T> {
    private comparator: (a: T, b: T) => number;

    constructor(comparator?: (a: T, b: T) => number) {
        this.comparator = comparator || ((a, b) => a < b ? -1 : a > b ? 1 : 0);
    }

    sort(arr: T[]): T[] {
        if (arr.length <= 1) {
            return arr;
        }

        const pivot = arr[0];
        const left: T[] = [];
        const right: T[] = [];

        for (let i = 1; i < arr.length; i++) {
            if (this.comparator(arr[i], pivot) < 0) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...this.sort(left), pivot, ...this.sort(right)];
    }

    sortInPlace(arr: T[], low: number = 0, high: number = arr.length - 1): void {
        if (low < high) {
            const pivotIndex = this.partition(arr, low, high);
            this.sortInPlace(arr, low, pivotIndex - 1);
            this.sortInPlace(arr, pivotIndex + 1, high);
        }
    }

    private partition(arr: T[], low: number, high: number): number {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (this.comparator(arr[j], pivot) <= 0) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }
}

// Usage
const sorter = new QuickSorter<number>();
const numbers = [3, 6, 8, 10, 1, 2, 1];
const sorted = sorter.sort(numbers);
console.log(sorted);

// Or in-place sorting
sorter.sortInPlace(numbers);
console.log(numbers);
