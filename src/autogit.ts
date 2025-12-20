function quicksort<T>(arr: T[]): T[] {
    if (arr.length <= 1) {
        return arr;
    }
    
    // Create a copy to avoid modifying the original array
    const array = [...arr];
    
    // Choose pivot (middle element)
    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];
    
    const left: T[] = [];
    const right: T[] = [];
    
    // Partition the array around the pivot
    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) continue;
        
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    
    // Recursively sort and combine
    return [...quicksort(left), pivot, ...quicksort(right)];
}
function quicksortInPlace<T>(arr: T[], left: number = 0, right: number = arr.length - 1): void {
    if (left >= right) return;
    
    const pivotIndex = partition(arr, left, right);
    
    quicksortInPlace(arr, left, pivotIndex - 1);
    quicksortInPlace(arr, pivotIndex + 1, right);
}

function partition<T>(arr: T[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
    }
    
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]; // Place pivot in correct position
    return i + 1;
}
function quicksortGeneric<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (arr.length <= 1) return arr;
    
    const array = [...arr];
    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];
    
    const left: T[] = [];
    const right: T[] = [];
    
    for (let i = 0; i < array.length; i++) {
        if (i === pivotIndex) continue;
        
        if (compareFn(array[i], pivot) < 0) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    
    return [
        ...quicksortGeneric(left, compareFn),
        pivot,
        ...quicksortGeneric(right, compareFn)
    ];
}
// Example with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", quicksort(numbers));

// Example with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log("Original:", strings);
console.log("Sorted:", quicksort(strings));

// Using the in-place version
const arrayToSort = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Before in-place:", arrayToSort);
quicksortInPlace(arrayToSort);
console.log("After in-place:", arrayToSort);

// Using custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = quicksortGeneric(people, (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);

const sortedByName = quicksortGeneric(people, (a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name:", sortedByName);
// Optimized version with tail recursion and better pivot selection
function optimizedQuicksort<T>(arr: T[]): T[] {
    function sort(array: T[], left: number, right: number): void {
        while (left < right) {
            const pivotIndex = optimizedPartition(array, left, right);
            
            // Recursively sort the smaller partition first
            if (pivotIndex - left < right - pivotIndex) {
                sort(array, left, pivotIndex - 1);
                left = pivotIndex + 1;
            } else {
                sort(array, pivotIndex + 1, right);
                right = pivotIndex - 1;
            }
        }
    }
    
    const array = [...arr];
    sort(array, 0, array.length - 1);
    return array;
}

function optimizedPartition<T>(arr: T[], left: number, right: number): number {
    // Median-of-three pivot selection
    const mid = Math.floor((left + right) / 2);
    const pivot = medianOfThree(arr, left, mid, right);
    
    let i = left - 1;
    let j = right + 1;
    
    while (true) {
        do { i++; } while (arr[i] < pivot);
        do { j--; } while (arr[j] > pivot);
        
        if (i >= j) return j;
        
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function medianOfThree<T>(arr: T[], a: number, b: number, c: number): T {
    if (arr[a] < arr[b]) {
        if (arr[b] < arr[c]) return arr[b];
        else if (arr[a] < arr[c]) return arr[c];
        else return arr[a];
    } else {
        if (arr[a] < arr[c]) return arr[a];
        else if (arr[b] < arr[c]) return arr[c];
        else return arr[b];
    }
}
