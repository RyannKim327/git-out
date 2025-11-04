/**
 * Interpolation Search Algorithm
 * 
 * Interpolation search is an improved version of binary search for uniformly distributed data.
 * It estimates the position of the target value based on the values at the boundaries.
 * 
 * Time Complexity: O(log log n) average case, O(n) worst case
 * Space Complexity: O(1)
 */

function interpolationSearch<T extends number>(
    arr: T[], 
    target: T, 
    compareFn?: (a: T, b: T) => number
): number {
    // Default comparison function for numbers
    const compare = compareFn || ((a: T, b: T) => a - b);
    
    // Ensure array is sorted
    if (!isSorted(arr, compare)) {
        throw new Error('Array must be sorted for interpolation search');
    }
    
    const n = arr.length;
    
    // Check boundary conditions
    if (n === 0) return -1;
    if (compare(target, arr[0]) < 0 || compare(target, arr[n - 1]) > 0) {
        return -1;
    }
    
    let low = 0;
    let high = n - 1;
    
    while (low <= high && compare(target, arr[low]) >= 0 && compare(target, arr[high]) <= 0) {
        // If low and high are the same, we've found the target or it doesn't exist
        if (low === high) {
            if (compare(arr[low], target) === 0) {
                return low;
            }
            return -1;
        }
        
        // Calculate the position using interpolation formula
        // pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        const targetVal = target as unknown as number;
        const lowVal = arr[low] as unknown as number;
        const highVal = arr[high] as unknown as number;
        
        // Avoid division by zero
        if (highVal - lowVal === 0) {
            if (compare(target, arr[low]) === 0) {
                return low;
            }
            return -1;
        }
        
        const pos = Math.floor(
            low + ((targetVal - lowVal) * (high - low)) / (highVal - lowVal)
        );
        
        // If position is out of bounds, adjust to nearest boundary
        if (pos < low) pos = low;
        if (pos > high) pos = high;
        
        const comparison = compare(target, arr[pos]);
        
        if (comparison === 0) {
            // Target found
            return pos;
        } else if (comparison > 0) {
            // Target is in the right subarray
            low = pos + 1;
        } else {
            // Target is in the left subarray
            high = pos - 1;
        }
    }
    
    return -1;
}

/**
 * Helper function to check if array is sorted
 */
function isSorted<T>(arr: T[], compareFn: (a: T, b: T) => number): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (compareFn(arr[i - 1], arr[i]) > 0) {
            return false;
        }
    }
    return true;
}

/**
 * Generic version for custom objects
 */
function interpolationSearchGeneric<T>(
    arr: T[], 
    target: T, 
    keyExtractor: (item: T) => number,
    compareFn?: (a: number, b: number) => number
): number {
    const extractKey = (item: T) => keyExtractor(item);
    const numericTarget = extractKey(target);
    
    const numericCompare = compareFn || ((a: number, b: number) => a - b);
    
    // Convert array to numeric values for search
    const numericArr = arr.map(extractKey);
    
    if (!isSortedNumeric(numericArr, numericCompare)) {
        throw new Error('Array must be sorted by key for interpolation search');
    }
    
    const n = arr.length;
    
    if (n === 0) return -1;
    if (numericCompare(numericTarget, numericArr[0]) < 0 || 
        numericCompare(numericTarget, numericArr[n - 1]) > 0) {
        return -1;
    }
    
    let low = 0;
    let high = n - 1;
    
    while (low <= high && 
           numericCompare(numericTarget, numericArr[low]) >= 0 && 
           numericCompare(numericTarget, numericArr[high]) <= 0) {
        
        if (low === high) {
            if (numericCompare(numericArr[low], numericTarget) === 0) {
                return low;
            }
            return -1;
        }
        
        if (numericArr[high] - numericArr[low] === 0) {
            if (numericCompare(numericTarget, numericArr[low]) === 0) {
                return low;
            }
            return -1;
        }
        
        const pos = Math.floor(
            low + ((numericTarget - numericArr[low]) * (high - low)) / 
            (numericArr[high] - numericArr[low])
        );
        
        if (pos < low) pos = low;
        if (pos > high) pos = high;
        
        const comparison = numericCompare(numericTarget, numericArr[pos]);
        
        if (comparison === 0) {
            return pos;
        } else if (comparison > 0) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    
    return -1;
}

function isSortedNumeric(arr: number[], compareFn: (a: number, b: number) => number): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (compareFn(arr[i - 1], arr[i]) > 0) {
            return false;
        }
    }
    return true;
}

// Example usage and testing
class Student {
    constructor(
        public id: number,
        public name: string
    ) {}
}

// Usage examples
function demonstrateInterpolationSearch(): void {
    // Example 1: Simple numeric array
    const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
    console.log('Numeric array:', numbers);
    
    console.log('Searching for 15:', interpolationSearch(numbers, 15)); // Output: 7
    console.log('Searching for 20:', interpolationSearch(numbers, 20)); // Output: -1
    console.log('Searching for 1:', interpolationSearch(numbers, 1));   // Output: 0
    
    // Example 2: Custom objects
    const students: Student[] = [
        new Student(101, 'Alice'),
        new Student(105, 'Bob'),
        new Student(110, 'Charlie'),
        new Student(120, 'Diana'),
        new Student(130, 'Eve'),
        new Student(140, 'Frank'),
        new Student(150, 'Grace')
    ];
    
    const targetStudent = new Student(120, ''); // Only ID matters for search
    
    console.log('\nStudent array:');
    students.forEach(s => console.log(`ID: ${s.id}, Name: ${s.name}`));
    
    const studentIndex = interpolationSearchGeneric(
        students,
        targetStudent,
        student => student.id
    );
    
    if (studentIndex !== -1) {
        console.log(`Found student with ID 120 at index ${studentIndex}:`, students[studentIndex]);
    } else {
        console.log('Student with ID 120 not found');
    }
    
    // Example 3: Custom comparison function
    const descendingNumbers = [25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3, 1];
    
    const customCompare = (a: number, b: number) => b - a; // Descending order
    console.log('\nSearching in descending array with custom comparator:');
    console.log('Searching for 15:', interpolationSearch(descendingNumbers, 15, customCompare));
}

// Run the demonstration
demonstrateInterpolationSearch();
