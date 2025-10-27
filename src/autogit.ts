class HeapSort<T> {
    // Main sorting method
    public static sort(array: T[]): T[] {
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

    // Heapify a subtree rooted with node i which is an index in array[]
    private static heapify<T>(array: T[], n: number, i: number): void {
        let largest = i; // Initialize largest as root
        const left = 2 * i + 1; // left child
        const right = 2 * i + 2; // right child

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

// Alternative functional implementation
function heapSort<T>(array: T[]): T[] {
    const result = [...array]; // Create a copy to avoid mutating original
    const n = result.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(result, n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapify(result, i, 0);
    }

    return result;
}

function heapify<T>(array: T[], n: number, i: number): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        heapify(array, n, largest);
    }
}

// Generic interface for custom comparison
interface Comparable<T> {
    compare(other: T): number;
}

// Heap sort with custom comparator
function heapSortWithComparator<T extends Comparable<T>>(array: T[]): T[] {
    const result = [...array];
    const n = result.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyWithComparator(result, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapifyWithComparator(result, i, 0);
    }

    return result;
}

function heapifyWithComparator<T extends Comparable<T>>(
    array: T[], 
    n: number, 
    i: number
): void {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left].compare(array[largest]) > 0) {
        largest = left;
    }

    if (right < n && array[right].compare(array[largest]) > 0) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        heapifyWithComparator(array, n, largest);
    }
}

// Example usage and testing
class Person implements Comparable<Person> {
    constructor(public name: string, public age: number) {}

    compare(other: Person): number {
        return this.age - other.age;
    }
}

// Test the implementation
function testHeapSort(): void {
    // Test with numbers
    const numbers = [12, 11, 13, 5, 6, 7];
    console.log('Original array:', numbers);
    console.log('Sorted (class):', HeapSort.sort(numbers));
    console.log('Sorted (functional):', heapSort(numbers));
    
    // Test with custom objects
    const people = [
        new Person('Alice', 30),
        new Person('Bob', 25),
        new Person('Charlie', 35)
    ];
    
    console.log('Sorted people by age:', 
        heapSortWithComparator(people).map(p => p.name));
    
    // Test edge cases
    console.log('Empty array:', heapSort([]));
    console.log('Single element:', heapSort([42]));
    console.log('Already sorted:', heapSort([1, 2, 3, 4, 5]));
}

// Run tests
testHeapSort();
// Basic usage with numbers
const sortedNumbers = heapSort([3, 1, 4, 1, 5, 9, 2, 6]);

// Custom objects with comparator
const products = [{ price: 100 }, { price: 50 }, { price: 200 }];
const sortedProducts = heapSortWithComparator(products);
