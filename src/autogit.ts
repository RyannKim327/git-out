function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Usage
const sortedArray = [1, 2, 3, 4, 5];
const unsortedArray = [1, 3, 2, 4, 5];

console.log(isSorted(sortedArray));    // true
console.log(isSorted(unsortedArray));  // false
function isSorted(arr: number[]): boolean {
    return arr.every((value, index, array) => 
        index === 0 || value >= array[index - 1]
    );
}

// Usage
console.log(isSorted([1, 2, 3, 4]));    // true
console.log(isSorted([1, 3, 2, 4]));    // false
function isSorted<T>(arr: T[], compareFn: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (compareFn(arr[i], arr[i - 1]) < 0) {
            return false;
        }
    }
    return true;
}

// Usage with numbers
console.log(isSorted([1, 2, 3, 4]));  // true

// Usage with strings
console.log(isSorted(['a', 'b', 'c'], (a, b) => a.localeCompare(b)));  // true

// Usage with custom objects
const objects = [{ value: 1 }, { value: 2 }, { value: 3 }];
console.log(isSorted(objects, (a, b) => a.value - b.value));  // true
const isSorted = (arr: number[]): boolean => 
    arr.slice(1).every((value, i) => value >= arr[i]);

// Usage
console.log(isSorted([1, 2, 3, 4]));  // true
function isSorted(arr: number[]): boolean {
    return arr.reduce((acc, curr, index, array) => {
        if (index === 0) return true;
        return acc && curr >= array[index - 1];
    }, true);
}
function isSorted(arr: number[]): boolean {
    if (arr.length <= 1) return true;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Test cases
console.log(isSorted([]));           // true (empty array)
console.log(isSorted([1]));          // true (single element)
console.log(isSorted([1, 1, 1]));    // true (equal values)
console.log(isSorted([1, 2, 2, 3])); // true (non-strict ascending)
