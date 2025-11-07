class IterativeMergeSort<T> {
    
    /**
     * Public method to sort an array using iterative merge sort
     * @param array - The array to be sorted
     * @param compareFn - Optional comparison function
     * @returns Sorted array
     */
    public sort(
        array: T[], 
        compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
    ): T[] {
        if (array.length <= 1) {
            return array;
        }

        const result = [...array]; // Create a copy to work with
        const temp = new Array<T>(array.length); // Temp array for merging
        
        // Start with subarrays of size 1 and double each time
        for (let size = 1; size < result.length; size *= 2) {
            for (let leftStart = 0; leftStart < result.length; leftStart += 2 * size) {
                const mid = Math.min(leftStart + size - 1, result.length - 1);
                const rightEnd = Math.min(leftStart + 2 * size - 1, result.length - 1);
                
                this.merge(result, temp, leftStart, mid, rightEnd, compareFn);
            }
        }
        
        return result;
    }

    /**
     * Merge two sorted subarrays
     */
    private merge(
        array: T[], 
        temp: T[], 
        leftStart: number, 
        mid: number, 
        rightEnd: number,
        compareFn: (a: T, b: T) => number
    ): void {
        let left = leftStart;
        let right = mid + 1;
        let tempIndex = leftStart;

        // Merge the two subarrays in sorted order
        while (left <= mid && right <= rightEnd) {
            if (compareFn(array[left], array[right]) <= 0) {
                temp[tempIndex++] = array[left++];
            } else {
                temp[tempIndex++] = array[right++];
            }
        }

        // Copy remaining elements from left subarray
        while (left <= mid) {
            temp[tempIndex++] = array[left++];
        }

        // Copy remaining elements from right subarray
        while (right <= rightEnd) {
            temp[tempIndex++] = array[right++];
        }

        // Copy merged elements back to original array
        for (let i = leftStart; i <= rightEnd; i++) {
            array[i] = temp[i];
        }
    }
}
function iterativeMergeSort<T>(
    array: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    if (array.length <= 1) return [...array];
    
    const result = [...array];
    const temp = new Array<T>(array.length);
    
    for (let size = 1; size < result.length; size *= 2) {
        for (let leftStart = 0; leftStart < result.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size - 1, result.length - 1);
            const rightEnd = Math.min(leftStart + 2 * size - 1, result.length - 1);
            
            // Merge process
            let left = leftStart;
            let right = mid + 1;
            let tempIndex = leftStart;
            
            while (left <= mid && right <= rightEnd) {
                temp[tempIndex++] = compareFn(result[left], result[right]) <= 0 
                    ? result[left++] 
                    : result[right++];
            }
            
            while (left <= mid) temp[tempIndex++] = result[left++];
            while (right <= rightEnd) temp[tempIndex++] = result[right++];
            
            for (let i = leftStart; i <= rightEnd; i++) result[i] = temp[i];
        }
    }
    
    return result;
}
// Test the implementation
const sorter = new IterativeMergeSort<number>();

// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", sorter.sort(numbers));
console.log("Sorted (functional):", iterativeMergeSort(numbers));

// Example 2: Sorting strings
const strings = ["banana", "apple", "cherry", "date"];
console.log("Original strings:", strings);
console.log("Sorted strings:", sorter.sort(strings));

// Example 3: Custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const sortedByAge = iterativeMergeSort(people, (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);

const sortedByName = iterativeMergeSort(people, (a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name:", sortedByName);
