function mergeSortIterative<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }

    const result = [...array];
    const auxiliary = [...array];
    
    const n = result.length;
    
    // Start with subarrays of size 1, then double the size each time
    for (let size = 1; size < n; size *= 2) {
        for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, n);
            const rightEnd = Math.min(leftStart + 2 * size, n);
            
            merge(
                result,
                auxiliary,
                leftStart,
                mid,
                rightEnd
            );
        }
        
        // Copy result back to auxiliary for next iteration
        for (let i = 0; i < n; i++) {
            auxiliary[i] = result[i];
        }
    }
    
    return result;
}

function merge<T>(
    result: T[],
    auxiliary: T[],
    leftStart: number,
    mid: number,
    rightEnd: number
): void {
    let leftIndex = leftStart;
    let rightIndex = mid;
    let resultIndex = leftStart;
    
    // Merge the two subarrays
    while (leftIndex < mid && rightIndex < rightEnd) {
        if (auxiliary[leftIndex] <= auxiliary[rightIndex]) {
            result[resultIndex] = auxiliary[leftIndex];
            leftIndex++;
        } else {
            result[resultIndex] = auxiliary[rightIndex];
            rightIndex++;
        }
        resultIndex++;
    }
    
    // Copy remaining elements from left subarray
    while (leftIndex < mid) {
        result[resultIndex] = auxiliary[leftIndex];
        leftIndex++;
        resultIndex++;
    }
    
    // Copy remaining elements from right subarray
    while (rightIndex < rightEnd) {
        result[resultIndex] = auxiliary[rightIndex];
        rightIndex++;
        resultIndex++;
    }
}
class MergeSortIterative<T> {
    sort(array: T[]): T[] {
        if (array.length <= 1) {
            return array;
        }
        
        const sorted = [...array];
        const n = sorted.length;
        const workspace: T[] = new Array(n);
        
        // Bottom-up merge sort
        for (let width = 1; width < n; width *= 2) {
            for (let i = 0; i < n; i += 2 * width) {
                this.merge(
                    sorted,
                    i,
                    Math.min(i + width, n),
                    Math.min(i + 2 * width, n),
                    workspace
                );
            }
        }
        
        return sorted;
    }
    
    private merge(
        array: T[],
        left: number,
        mid: number,
        right: number,
        workspace: T[]
    ): void {
        let i = left;
        let j = mid;
        let k = left;
        
        // Copy to workspace
        for (let idx = left; idx < right; idx++) {
            workspace[idx] = array[idx];
        }
        
        // Merge back to array
        while (i < mid && j < right) {
            if (workspace[i] <= workspace[j]) {
                array[k] = workspace[i];
                i++;
            } else {
                array[k] = workspace[j];
                j++;
            }
            k++;
        }
        
        // Copy remaining elements
        while (i < mid) {
            array[k] = workspace[i];
            i++;
            k++;
        }
        
        while (j < right) {
            array[k] = workspace[j];
            j++;
            k++;
        }
    }
}
// Example with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', numbers);
console.log('Sorted:', mergeSortIterative(numbers));

// Example with strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Original:', strings);
console.log('Sorted:', mergeSortIterative(strings));

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'John', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedPeople = mergeSortIterative(people).sort((a, b) => a.age - b.age);
console.log('Sorted by age:', sortedPeople);

// Using the class-based approach
const sorter = new MergeSortIterative<number>();
const result = sorter.sort([5, 2, 8, 1, 9]);
console.log('Class-based result:', result);
