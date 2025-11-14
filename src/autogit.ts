class HeapSort {
    public static sort<T>(array: T[]): T[] {
        const n = array.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            HeapSort.heapify(array, n, i);
        }
        
        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            // Move current root to end
            [array[0], array[i]] = [array[i], array[0]];
            
            // Call heapify on the reduced heap
            HeapSort.heapify(array, i, 0);
        }
        
        return array;
    }
    
    private static heapify<T>(array: T[], n: number, i: number): void {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1; // Left child
        const right = 2 * i + 2; // Right child
        
        // If left child is larger than root
        if (left < n && array[left] > array[largest]) {
            largest = left;
        }
        
        // If right child is larger than largest so far
        if (right < n && array[right] > array[largest]) {
            largest = right;
        }
        
        // If largest is not root
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            
            // Recursively heapify the affected sub-tree
            HeapSort.heapify(array, n, largest);
        }
    }
}

// Generic version with comparator
class HeapSortGeneric {
    public static sort<T>(
        array: T[], 
        comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
    ): T[] {
        const n = array.length;
        
        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            HeapSortGeneric.heapify(array, n, i, comparator);
        }
        
        // Extract elements from heap
        for (let i = n - 1; i > 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
            HeapSortGeneric.heapify(array, i, 0, comparator);
        }
        
        return array;
    }
    
    private static heapify<T>(
        array: T[], 
        n: number, 
        i: number, 
        comparator: (a: T, b: T) => number
    ): void {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        if (left < n && comparator(array[left], array[largest]) > 0) {
            largest = left;
        }
        
        if (right < n && comparator(array[right], array[largest]) > 0) {
            largest = right;
        }
        
        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            HeapSortGeneric.heapify(array, n, largest, comparator);
        }
    }
}

// Example usage and testing
function testHeapSort() {
    // Test with numbers
    const numbers = [64, 34, 25, 12, 22, 11, 90];
    console.log("Original array:", numbers);
    console.log("Sorted array:", HeapSort.sort(numbers));
    
    // Test with strings
    const strings = ["banana", "apple", "cherry", "date"];
    console.log("Original strings:", strings);
    console.log("Sorted strings:", HeapSort.sort(strings));
    
    // Test with custom comparator (descending order)
    const descendingComparator = (a: number, b: number) => b - a;
    const numbersDesc = [64, 34, 25, 12, 22, 11, 90];
    console.log("Descending sorted:", HeapSortGeneric.sort(numbersDesc, descendingComparator));
    
    // Test with custom objects
    interface Person {
        name: string;
        age: number;
    }
    
    const people: Person[] = [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
        { name: "Bob", age: 35 }
    ];
    
    const ageComparator = (a: Person, b: Person) => a.age - b.age;
    console.log("Sorted by age:", HeapSortGeneric.sort(people, ageComparator));
}

// Run tests
testHeapSort();
// Basic usage with numbers
const sortedNumbers = HeapSort.sort([3, 1, 4, 1, 5, 9, 2, 6]);

// Custom comparator for descending order
const descending = HeapSortGeneric.sort(
    [3, 1, 4, 1, 5, 9, 2, 6],
    (a, b) => b - a
);

// Sorting custom objects
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 300 }
];

const sortedByPrice = HeapSortGeneric.sort(
    products,
    (a, b) => a.price - b.price
);
