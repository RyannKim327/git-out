function mergeSortIterative<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    const temp = new Array(array.length);
    
    for (let size = 1; size < array.length; size *= 2) {
        for (let leftStart = 0; leftStart < array.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, array.length);
            const rightEnd = Math.min(leftStart + 2 * size, array.length);
            
            merge(
                result,
                temp,
                leftStart,
                mid,
                rightEnd
            );
        }
        
        // Copy temp back to result for next iteration
        for (let i = 0; i < array.length; i++) {
            result[i] = temp[i];
        }
    }
    
    return result;
}

function merge<T>(
    array: T[],
    temp: T[],
    leftStart: number,
    mid: number,
    rightEnd: number
): void {
    let left = leftStart;
    let right = mid;
    let index = leftStart;
    
    while (left < mid && right < rightEnd) {
        if (array[left] <= array[right]) {
            temp[index++] = array[left++];
        } else {
            temp[index++] = array[right++];
        }
    }
    
    // Copy remaining elements from left subarray
    while (left < mid) {
        temp[index++] = array[left++];
    }
    
    // Copy remaining elements from right subarray
    while (right < rightEnd) {
        temp[index++] = array[right++];
    }
}
function mergeSortIterativeStack<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    // Create a stack of arrays to merge
    const stack: T[][] = array.map(item => [item]);
    
    while (stack.length > 1) {
        const left = stack.pop()!;
        const right = stack.pop()!;
        const merged = mergeArrays(left, right);
        stack.push(merged);
    }
    
    return stack[0];
}

function mergeArrays<T>(left: T[], right: T[]): T[] {
    const result: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result.push(left[leftIndex++]);
        } else {
            result.push(right[rightIndex++]);
        }
    }
    
    // Add remaining elements
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
function mergeSortIterativeGeneric<T>(
    array: T[],
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    const temp = new Array(array.length);
    
    for (let size = 1; size < array.length; size *= 2) {
        for (let leftStart = 0; leftStart < array.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, array.length);
            const rightEnd = Math.min(leftStart + 2 * size, array.length);
            
            mergeGeneric(
                result,
                temp,
                leftStart,
                mid,
                rightEnd,
                comparator
            );
        }
        
        // Copy temp back to result for next iteration
        for (let i = 0; i < array.length; i++) {
            result[i] = temp[i];
        }
    }
    
    return result;
}

function mergeGeneric<T>(
    array: T[],
    temp: T[],
    leftStart: number,
    mid: number,
    rightEnd: number,
    comparator: (a: T, b: T) => number
): void {
    let left = leftStart;
    let right = mid;
    let index = leftStart;
    
    while (left < mid && right < rightEnd) {
        if (comparator(array[left], array[right]) <= 0) {
            temp[index++] = array[left++];
        } else {
            temp[index++] = array[right++];
        }
    }
    
    while (left < mid) {
        temp[index++] = array[left++];
    }
    
    while (right < rightEnd) {
        temp[index++] = array[right++];
    }
}
// Test with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', mergeSortIterative(numbers));

// Test with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Original:', strings);
console.log('Sorted:', mergeSortIterative(strings));

// Test with custom comparator
const objects = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 22 },
    { name: 'Bob', age: 30 }
];

const sortedByAge = mergeSortIterativeGeneric(
    objects,
    (a, b) => a.age - b.age
);
console.log('Sorted by age:', sortedByAge);
