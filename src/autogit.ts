function quicksort<T>(arr: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Choose pivot (using the last element)
    const pivot = arr[arr.length - 1];
    const left: T[] = [];
    const right: T[] = [];
    const middle: T[] = [];

    // Partition the array
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else if (arr[i] > pivot) {
            right.push(arr[i]);
        } else {
            middle.push(arr[i]);
        }
    }

    // Recursively sort sub-arrays and combine
    return [
        ...quicksort(left),
        ...middle,
        ...quicksort(right),
        pivot
    ];
}

// Generic version that works with custom comparators
function quicksortWithComparator<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left: T[] = [];
    const right: T[] = [];
    const middle: T[] = [];

    for (let i = 0; i < arr.length - 1; i++) {
        const comparison = compareFn(arr[i], pivot);
        if (comparison < 0) {
            left.push(arr[i]);
        } else if (comparison > 0) {
            right.push(arr[i]);
        } else {
            middle.push(arr[i]);
        }
    }

    return [
        ...quicksortWithComparator(left, compareFn),
        ...middle,
        ...quicksortWithComparator(right, compareFn),
        pivot
    ];
}

// In-place quicksort (mutates the original array)
function quicksortInPlace<T>(arr: T[], low: number = 0, high: number = arr.length - 1): void {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quicksortInPlace(arr, low, pivotIndex - 1);
        quicksortInPlace(arr, pivotIndex + 1, high);
    }
}

function partition<T>(arr: T[], low: number, high: number): number {
    // Choose pivot (middle element for better performance)
    const pivot = arr[Math.floor((low + high) / 2)];
    
    // Partition logic
    let i = low - 1;
    let j = high + 1;

    while (true) {
        do {
            i++;
        } while (arr[i] < pivot);

        do {
            j--;
        } while (arr[j] > pivot);

        if (i >= j) {
            return j;
        }

        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted (functional):', quicksort(numbers));
console.log('Sorted (in-place):');
quicksortInPlace(numbers);
console.log(numbers);

const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Strings sorted:', quicksort(strings));

// Custom comparator example (sort numbers descending)
const descendingNumbers = [3, 1, 4, 1, 5, 9];
console.log('Descending sort:', quicksortWithComparator(descendingNumbers, (a, b) => b - a));
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 20 }
];

// Sort by age
const sortedByAge = quicksortWithComparator(people, (a, b) => a.age - b.age);

// Sort by name
const sortedByName = quicksortWithComparator(people, (a, b) => a.name.localeCompare(b.name));
