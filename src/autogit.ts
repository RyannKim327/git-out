function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // [11, 12, 22, 25, 34, 64, 90]
function mergeSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) {
        return arr;
    }
    
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    
    return merge(
        mergeSort(left, compareFn),
        mergeSort(right, compareFn),
        compareFn
    );
}

function merge<T>(
    left: T[], 
    right: T[], 
    compareFn?: (a: T, b: T) => number
): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Default comparison function if none provided
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (compare(left[leftIndex], right[rightIndex]) <= 0) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Usage examples
const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers);

const strings = ["banana", "apple", "cherry", "date"];
const sortedStrings = mergeSort(strings);
console.log(sortedStrings);

// With custom comparator
const objects = [
    { name: "John", age: 25 },
    { name: "Jane", age: 30 },
    { name: "Bob", age: 20 }
];

const sortedByAge = mergeSort(objects, (a, b) => a.age - b.age);
console.log(sortedByAge);
function mergeSortInPlace<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) return arr;
    
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    const aux: T[] = [...arr];
    mergeSortHelper(arr, 0, arr.length - 1, aux, compare);
    return arr;
}

function mergeSortHelper<T>(
    arr: T[], 
    start: number, 
    end: number, 
    aux: T[], 
    compare: (a: T, b: T) => number
): void {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    mergeSortHelper(aux, start, mid, arr, compare);
    mergeSortHelper(aux, mid + 1, end, arr, compare);
    mergeInPlace(arr, start, mid, end, aux, compare);
}

function mergeInPlace<T>(
    arr: T[], 
    start: number, 
    mid: number, 
    end: number, 
    aux: T[], 
    compare: (a: T, b: T) => number
): void {
    let i = start;
    let j = mid + 1;
    let k = start;
    
    while (i <= mid && j <= end) {
        if (compare(aux[i], aux[j]) <= 0) {
            arr[k] = aux[i];
            i++;
        } else {
            arr[k] = aux[j];
            j++;
        }
        k++;
    }
    
    while (i <= mid) {
        arr[k] = aux[i];
        i++;
        k++;
    }
    
    while (j <= end) {
        arr[k] = aux[j];
        j++;
        k++;
    }
}
