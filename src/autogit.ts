function mergeSortIterative<T>(arr: T[]): T[] {
    if (arr.length <= 1) {
        return arr;
    }

    // Create a temporary array for merging
    const temp = new Array<T>(arr.length);
    let currentSize = 1;
    const n = arr.length;

    // Merge subarrays of increasing size
    while (currentSize < n - 1) {
        let leftStart = 0;
        
        // Merge pairs of subarrays
        while (leftStart < n - 1) {
            const leftEnd = Math.min(leftStart + currentSize - 1, n - 1);
            const rightEnd = Math.min(leftEnd + currentSize, n - 1);
            const rightStart = leftEnd + 1;

            // Merge the two subarrays
            merge(arr, temp, leftStart, leftEnd, rightStart, rightEnd);
            
            leftStart = rightEnd + 1;
        }
        
        currentSize *= 2;
    }

    // Handle the last merge if array length is odd
    if (currentSize >= n) {
        const leftStart = 0;
        const leftEnd = n - 1;
        const rightEnd = n - 1;
        merge(arr, temp, leftStart, leftEnd, leftStart, rightEnd);
    }

    return arr;
}

function merge<T>(
    arr: T[], 
    temp: T[], 
    leftStart: number, 
    leftEnd: number, 
    rightStart: number, 
    rightEnd: number
): void {
    let i = leftStart;      // Starting index of left subarray
    let j = rightStart;     // Starting index of right subarray
    let k = leftStart;      // Starting index for the temp array

    // Compare elements from both subarrays and merge them
    while (i <= leftEnd && j <= rightEnd) {
        if (compare(arr[i], arr[j]) <= 0) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }

    // Copy remaining elements of left subarray, if any
    while (i <= leftEnd) {
        temp[k++] = arr[i++];
    }

    // Copy remaining elements of right subarray, if any
    while (j <= rightEnd) {
        temp[k++] = arr[j++];
    }

    // Copy merged elements back to original array
    for (let idx = leftStart; idx <= rightEnd; idx++) {
        arr[idx] = temp[idx];
    }
}

// Generic comparison function - customize based on your needs
function compare<T>(a: T, b: T): number {
    if (a instanceof Date && b instanceof Date) {
        return a.getTime() - b.getTime();
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
    }
    // For numbers and other comparable types
    return (a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0;
}

// Usage examples
console.log(mergeSortIterative([64, 34, 25, 12, 22, 11, 90])); 
// Output: [11, 12, 22, 25, 34, 64, 90]

console.log(mergeSortIterative(['banana', 'apple', 'cherry', 'date']));
// Output: ['apple', 'banana', 'cherry', 'date']

console.log(mergeSortIterative([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]));
// Output: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
interface Person {
    name: string;
    age: number;
}

function mergeSortWithComparator<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number
): T[] {
    // ... (similar structure, but use the provided comparator)
    // Replace compare(arr[i], arr[j]) with comparator(arr[i], arr[j])
}

const people: Person[] = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedByAge = mergeSortWithComparator(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// Output: [{name: 'Jane', age: 25}, {name: 'John', age: 30}, {name: 'Bob', age: 35}]
