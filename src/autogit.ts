class HeapSort<T> {
    
    /**
     * Main heap sort function
     * @param array - Array to be sorted
     * @returns Sorted array
     */
    public static sort<T>(array: T[]): T[] {
        const arr = [...array]; // Create a copy to avoid mutating original
        const n = arr.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            HeapSort.heapify(arr, n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [arr[0], arr[i]] = [arr[i], arr[0]];
            
            // Call heapify on the reduced heap
            HeapSort.heapify(arr, i, 0);
        }
        
        return arr;
    }
    
    /**
     * Heapify a subtree rooted with node i which is an index in arr[]
     * @param arr - Array to heapify
     * @param n - Size of heap
     * @param i - Root index
     */
    private static heapify<T>(arr: T[], n: number, i: number): void {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1; // Left child
        const right = 2 * i + 2; // Right child
        
        // If left child is larger than root
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        
        // If right child is larger than largest so far
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If largest is not root
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            
            // Recursively heapify the affected sub-tree
            HeapSort.heapify(arr, n, largest);
        }
    }
}

// Alternative functional implementation
function heapSort<T>(array: T[]): T[] {
    const arr = [...array];
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify<T>(arr: T[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Example usage and testing
function testHeapSort(): void {
    // Test with numbers
    const numbers = [64, 34, 25, 12, 22, 11, 90];
    console.log("Original:", numbers);
    console.log("Sorted:", HeapSort.sort(numbers));
    
    // Test with strings
    const strings = ["banana", "apple", "cherry", "date"];
    console.log("Original:", strings);
    console.log("Sorted:", HeapSort.sort(strings));
    
    // Test with custom objects
    interface Person {
        name: string;
        age: number;
    }
    
    const people: Person[] = [
        { name: "John", age: 30 },
        { name: "Alice", age: 25 },
        { name: "Bob", age: 35 }
    ];
    
    // Sort by age using custom comparator
    const sortedByAge = HeapSort.sort(people.map(p => p.age));
    console.log("Sorted ages:", sortedByAge);
}

// Run tests
testHeapSort();

// Export for use in other modules
export { HeapSort, heapSort };
class HeapSortWithComparator<T> {
    
    /**
     * Heap sort with custom comparator
     * @param array - Array to be sorted
     * @param compareFn - Custom comparison function
     * @returns Sorted array
     */
    public static sort<T>(
        array: T[], 
        compareFn: (a: T, b: T) => number = (a, b) => a > b ? 1 : a < b ? -1 : 0
    ): T[] {
        const arr = [...array];
        const n = arr.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            HeapSortWithComparator.heapify(arr, n, i, compareFn);
        }
        
        // Extract elements
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            HeapSortWithComparator.heapify(arr, i, 0, compareFn);
        }
        
        return arr;
    }
    
    private static heapify<T>(
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
            HeapSortWithComparator.heapify(arr, n, largest, compareFn);
        }
    }
}

// Example with custom comparator
const objects = [
    { value: 5, priority: 2 },
    { value: 3, priority: 1 },
    { value: 8, priority: 3 }
];

const sortedObjects = HeapSortWithComparator.sort(
    objects,
    (a, b) => a.priority - b.priority // Sort by priority
);

console.log("Sorted objects:", sortedObjects);
// Basic usage
const sortedNumbers = HeapSort.sort([3, 1, 4, 1, 5, 9, 2, 6]);

// With custom comparator
const sortedDescending = HeapSortWithComparator.sort(
    [3, 1, 4, 1, 5],
    (a, b) => b - a // Sort descending
);

// With complex objects
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 699 },
    { name: "Tablet", price: 399 }
];

const sortedByPrice = HeapSortWithComparator.sort(
    products,
    (a, b) => a.price - b.price
);
