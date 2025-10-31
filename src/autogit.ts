class HeapSort<T> {
    private heapSize: number = 0;

    /**
     * Main heap sort function
     */
    public sort(array: T[]): T[] {
        // Clone array to avoid mutating original
        const sortedArray = [...array];
        this.heapSize = sortedArray.length;

        // Build max heap
        this.buildMaxHeap(sortedArray);

        // Extract elements from heap one by one
        for (let i = sortedArray.length - 1; i >= 1; i--) {
            // Move current root to end
            this.swap(sortedArray, 0, i);
            this.heapSize--;
            
            // Restore max heap property on reduced heap
            this.maxHeapify(sortedArray, 0);
        }

        return sortedArray;
    }

    /**
     * Build a max heap from an unsorted array
     */
    private buildMaxHeap(array: T[]): void {
        for (let i = Math.floor(array.length / 2); i >= 0; i--) {
            this.maxHeapify(array, i);
        }
    }

    /**
     * Maintain the max heap property
     */
    private maxHeapify(array: T[], index: number): void {
        const left = this.leftChild(index);
        const right = this.rightChild(index);
        let largest = index;

        // Compare with left child
        if (left < this.heapSize && array[left] > array[largest]) {
            largest = left;
        }

        // Compare with right child
        if (right < this.heapSize && array[right] > array[largest]) {
            largest = right;
        }

        // If largest is not the current node, swap and recursively heapify
        if (largest !== index) {
            this.swap(array, index, largest);
            this.maxHeapify(array, largest);
        }
    }

    /**
     * Get left child index
     */
    private leftChild(index: number): number {
        return 2 * index + 1;
    }

    /**
     * Get right child index
     */
    private rightChild(index: number): number {
        return 2 * index + 2;
    }

    /**
     * Swap two elements in array
     */
    private swap(array: T[], i: number, j: number): void {
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Alternative functional implementation
function heapSort<T>(array: T[]): T[] {
    const result = [...array];
    let heapSize = result.length;

    function buildMaxHeap(): void {
        for (let i = Math.floor(result.length / 2); i >= 0; i--) {
            maxHeapify(i);
        }
    }

    function maxHeapify(index: number): void {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let largest = index;

        if (left < heapSize && result[left] > result[largest]) {
            largest = left;
        }

        if (right < heapSize && result[right] > result[largest]) {
            largest = right;
        }

        if (largest !== index) {
            [result[index], result[largest]] = [result[largest], result[index]];
            maxHeapify(largest);
        }
    }

    buildMaxHeap();

    for (let i = result.length - 1; i >= 1; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapSize--;
        maxHeapify(0);
    }

    return result;
}

// Generic implementation with custom comparator
function heapSortWithComparator<T>(
    array: T[], 
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
    const result = [...array];
    let heapSize = result.length;

    function buildMaxHeap(): void {
        for (let i = Math.floor(result.length / 2); i >= 0; i--) {
            maxHeapify(i);
        }
    }

    function maxHeapify(index: number): void {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let largest = index;

        if (left < heapSize && comparator(result[left], result[largest]) > 0) {
            largest = left;
        }

        if (right < heapSize && comparator(result[right], result[largest]) > 0) {
            largest = right;
        }

        if (largest !== index) {
            [result[index], result[largest]] = [result[largest], result[index]];
            maxHeapify(largest);
        }
    }

    buildMaxHeap();

    for (let i = result.length - 1; i >= 1; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapSize--;
        maxHeapify(0);
    }

    return result;
}

// Example usage and testing
console.log("Heap Sort Examples:");

// Test with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
const heapSorter = new HeapSort<number>();
console.log("Numbers sorted:", heapSorter.sort(numbers));
console.log("Functional version:", heapSort(numbers));

// Test with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log("Strings sorted:", heapSort(strings));

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
const sortedByAge = heapSortWithComparator(people, (a, b) => a.age - b.age);
console.log("People sorted by age:", sortedByAge);

// Sort by name using custom comparator
const sortedByName = heapSortWithComparator(people, (a, b) => 
    a.name.localeCompare(b.name)
);
console.log("People sorted by name:", sortedByName);

// Performance test
const largeArray = Array.from({ length: 1000 }, () => 
    Math.floor(Math.random() * 1000)
);
console.log("Large array sorted (first 10 elements):", 
    heapSort(largeArray).slice(0, 10));
// Simple number sorting
const sorted = heapSort([3, 1, 4, 1, 5, 9, 2, 6]);

// Custom object sorting
const users = [{ name: "John", score: 85 }, { name: "Jane", score: 92 }];
const sortedUsers = heapSortWithComparator(users, (a, b) => b.score - a.score);

// Descending order
const descending = heapSortWithComparator([5, 2, 8, 1], (a, b) => b - a);
