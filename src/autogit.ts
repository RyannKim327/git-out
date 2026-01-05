function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Usage
console.log(isSorted([1, 2, 3, 4, 5])); // true
console.log(isSorted([1, 3, 2, 4, 5])); // false
function isSorted(arr: number[]): boolean {
    return arr.every((value, index) => index === 0 || value >= arr[index - 1]);
}

// Usage
console.log(isSorted([1, 2, 3, 4, 5])); // true
console.log(isSorted([5, 4, 3, 2, 1])); // false
function isSorted<T>(arr: T[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Usage with numbers
console.log(isSorted([1, 2, 3, 4, 5])); // true

// Usage with strings
console.log(isSorted(['a', 'b', 'c'])); // true
console.log(isSorted(['c', 'a', 'b'])); // false
function isSorted<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (comparator(arr[i], arr[i - 1]) < 0) {
            return false;
        }
    }
    return true;
}

// Usage with default comparator (ascending)
console.log(isSorted([1, 2, 3, 4, 5])); // true

// Usage with custom comparator (descending)
console.log(isSorted([5, 4, 3, 2, 1], (a, b) => b - a)); // true
const isSorted = (arr: number[]): boolean => 
    arr.slice(1).every((value, index) => value >= arr[index]);

// Usage
console.log(isSorted([1, 2, 3, 4, 5])); // true
console.log(isSorted([1, 3, 2, 4, 5])); // false
function isSorted(arr: number[]): boolean {
    // Handle empty array and single-element array
    if (arr.length <= 1) {
        return true;
    }
    
    // Handle arrays with duplicates
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Edge case tests
console.log(isSorted([])); // true
console.log(isSorted([1])); // true
console.log(isSorted([1, 1, 2, 2, 3])); // true (duplicates allowed)
