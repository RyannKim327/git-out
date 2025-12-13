class HeapSort<T> {
    /**
     * Sorts an array using heap sort algorithm
     * @param array - The array to be sorted
     * @param compareFn - Optional custom comparison function
     * @returns The sorted array
     */
    public static sort<T>(
        array: T[],
        compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
    ): T[] {
        const arr = [...array]; // Create a copy to avoid mutating original array
        const n = arr.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            HeapSort.heapify(arr, n, i, compareFn);
        }

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];
            
            // Call heapify on the reduced heap
            HeapSort.heapify(arr, i, 0, compareFn);
        }

        return arr;
    }

    /**
     * Heapify a subtree rooted with node i which is an index in arr[]
     * @param arr - The array to heapify
     * @param n - Size of the heap
     * @param i - Index of the root node
     * @param compareFn - Comparison function
     */
    private static heapify<T>(
        arr: T[],
        n: number,
        i: number,
        compareFn: (a: T, b: T) => number
    ): void {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1; // left child
        const right = 2 * i + 2; // right child

        // If left child is larger than root
        if (left < n && compareFn(arr[left], arr[largest]) > 0) {
            largest = left;
        }

        // If right child is larger than largest so far
        if (right < n && compareFn(arr[right], arr[largest]) > 0) {
            largest = right;
        }

        // If largest is not root
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            
            // Recursively heapify the affected sub-tree
            HeapSort.heapify(arr, n, largest, compareFn);
        }
    }
}

// Alternative functional approach
function heapSort<T>(
    array: T[],
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
    const arr = [...array];
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i, compareFn);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0, compareFn);
    }

    return arr;
}

function heapify<T>(
    arr: T[],
    n: number,
    i: number,
    compareFn: (a: T, b: T) => number
): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && compareFn(arr[left], arr[largest]) > 0) {
        largest = left;
    }

    if (right < n && compareFn(arr[right], arr[largest]) > 0) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest, compareFn);
    }
}
// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
const strings = ["banana", "apple", "cherry", "date"];

// Using class-based approach
console.log("Sorted numbers:", HeapSort.sort(numbers));
console.log("Sorted strings:", HeapSort.sort(strings));

// Using functional approach
console.log("Sorted numbers:", heapSort(numbers));
console.log("Sorted strings:", heapSort(strings));

// Custom comparison for descending order
const descendingCompare = (a: number, b: number) => b - a;
console.log("Descending order:", HeapSort.sort(numbers, descendingCompare));

// Custom object sorting
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "John", age: 30 },
    { name: "Alice", age: 25 },
    { name: "Bob", age: 35 }
];

const sortedByAge = HeapSort.sort(people, (a, b) => a.age - b.age);
console.log("Sorted by age:", sortedByAge);
// Time complexity analysis
class HeapSortAnalysis {
    /**
     * Time Complexity:
     * - Best case: O(n log n)
     * - Average case: O(n log n)
     * - Worst case: O(n log n)
     * 
     * Space Complexity: O(1) - in-place sorting
     */
    
    public static demonstratePerformance(): void {
        const largeArray = Array.from({ length: 10000 }, () => 
            Math.floor(Math.random() * 1000)
        );
        
        console.time("HeapSort Execution");
        const sorted = HeapSort.sort(largeArray);
        console.timeEnd("HeapSort Execution");
        
        console.log("First 10 elements:", sorted.slice(0, 10));
    }
}

HeapSortAnalysis.demonstratePerformance();
