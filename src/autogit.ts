function mergeSortIterative<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    
    // Create a temporary array for merging
    const temp = new Array(array.length);
    
    // Start with subarrays of size 1, then double each time
    for (let size = 1; size < array.length; size *= 2) {
        // Merge adjacent subarrays
        for (let leftStart = 0; leftStart < array.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, array.length);
            const rightEnd = Math.min(leftStart + 2 * size, array.length);
            
            // Only merge if there are elements in both halves
            if (mid < rightEnd) {
                merge(
                    result, 
                    temp, 
                    leftStart, 
                    mid, 
                    rightEnd
                );
            }
        }
        
        // Copy temp back to result for the next iteration
        for (let i = 0; i < result.length; i++) {
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
    let tempIndex = leftStart;
    
    // Merge the two subarrays in sorted order
    while (left < mid && right < rightEnd) {
        if (array[left] <= array[right]) {
            temp[tempIndex] = array[left];
            left++;
        } else {
            temp[tempIndex] = array[right];
            right++;
        }
        tempIndex++;
    }
    
    // Copy remaining elements from left subarray
    while (left < mid) {
        temp[tempIndex] = array[left];
        left++;
        tempIndex++;
    }
    
    // Copy remaining elements from right subarray
    while (right < rightEnd) {
        temp[tempIndex] = array[right];
        right++;
        tempIndex++;
    }
}

// Alternative implementation with better space management
function mergeSortIterativeOptimized<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    let src = [...array];
    let dest = new Array(array.length);
    
    for (let size = 1; size < array.length; size *= 2) {
        for (let leftStart = 0; leftStart < array.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, array.length);
            const rightEnd = Math.min(leftStart + 2 * size, array.length);
            
            mergeOptimized(src, dest, leftStart, mid, rightEnd);
        }
        
        // Swap source and destination arrays
        [src, dest] = [dest, src];
    }
    
    return src;
}

function mergeOptimized<T>(
    src: T[], 
    dest: T[], 
    leftStart: number, 
    mid: number, 
    rightEnd: number
): void {
    let left = leftStart;
    let right = mid;
    let destIndex = leftStart;
    
    while (left < mid && right < rightEnd) {
        if (src[left] <= src[right]) {
            dest[destIndex] = src[left];
            left++;
        } else {
            dest[destIndex] = src[right];
            right++;
        }
        destIndex++;
    }
    
    while (left < mid) {
        dest[destIndex] = src[left];
        left++;
        destIndex++;
    }
    
    while (right < rightEnd) {
        dest[destIndex] = src[right];
        right++;
        destIndex++;
    }
}

// Example usage and testing
function testMergeSort(): void {
    // Test with numbers
    const numbers = [64, 34, 25, 12, 22, 11, 90];
    console.log('Original:', numbers);
    console.log('Sorted:', mergeSortIterative(numbers));
    
    // Test with strings
    const strings = ['banana', 'apple', 'cherry', 'date'];
    console.log('Original:', strings);
    console.log('Sorted:', mergeSortIterative(strings));
    
    // Test with custom objects
    interface Person {
        name: string;
        age: number;
    }
    
    const people: Person[] = [
        { name: 'John', age: 30 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 35 }
    ];
    
    // Sort by age
    const sortedByAge = mergeSortIterative([...people].map((p, i) => ({ ...p, index: i })))
        .map(p => ({ name: p.name, age: p.age }));
    console.log('People sorted by age:', sortedByAge);
    
    // Performance test
    const largeArray = Array.from({ length: 1000 }, () => 
        Math.floor(Math.random() * 1000)
    );
    console.log('Large array sorted (first 10 elements):', 
        mergeSortIterative([...largeArray]).slice(0, 10));
}

// Run tests
testMergeSort();
