function quicksort<T>(array: T[]): T[] {
    // Base case: arrays with 0 or 1 element are already sorted
    if (array.length <= 1) {
        return array;
    }
    
    // Make a copy to avoid mutating the original array
    const arr = [...array];
    
    // Choose pivot (middle element)
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    
    // Partition the array into three parts
    const left: T[] = [];
    const right: T[] = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue; // Skip the pivot element
        
        if (arr[i] <= pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    // Recursively sort and combine
    return [...quicksort(left), pivot, ...quicksort(right)];
}
function quicksortInPlace<T>(array: T[], left: number = 0, right: number = array.length - 1): void {
    if (left < right) {
        // Partition the array and get the pivot index
        const pivotIndex = partition(array, left, right);
        
        // Recursively sort elements before and after partition
        quicksortInPlace(array, left, pivotIndex - 1);
        quicksortInPlace(array, pivotIndex + 1, right);
    }
}

function partition<T>(array: T[], left: number, right: number): number {
    // Choose the rightmost element as pivot
    const pivot = array[right];
    
    // Index of smaller element (indicates right position of pivot)
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
        // If current element is smaller than or equal to pivot
        if (array[j] <= pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }
    
    // Place pivot in correct position
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    return i + 1;
}
function quicksortGeneric<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }
    
    const arr = [...array];
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    
    const left: T[] = [];
    const right: T[] = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (i === pivotIndex) continue;
        
        if (compareFn(arr[i], pivot) <= 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    
    return [
        ...quicksortGeneric(left, compareFn),
        pivot,
        ...quicksortGeneric(right, compareFn)
    ];
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];

// Basic quicksort
console.log(quicksort(numbers)); // [11, 12, 22, 25, 34, 64, 90]
console.log(quicksort(strings)); // ["apple", "banana", "cherry", "date"]

// In-place quicksort
const numbersCopy = [...numbers];
quicksortInPlace(numbersCopy);
console.log(numbersCopy); // [11, 12, 22, 25, 34, 64, 90]

// Generic with custom comparator
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

// Sort by age
const sortedByAge = quicksortGeneric(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name: "Bob", age: 25}, {name: "Alice", age: 30}, {name: "Charlie", age: 35}]

// Sort by name
const sortedByName = quicksortGeneric(people, (a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);
// [{name: "Alice", age: 30}, {name: "Bob", age: 25}, {name: "Charlie", age: 35}]
