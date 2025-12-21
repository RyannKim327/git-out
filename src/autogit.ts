function kthSmallestSort(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Example usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(kthSmallestSort(numbers, 2)); // Output: 2
function quickSelect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    return _quickSelect([...arr], 0, arr.length - 1, k - 1);
}

function _quickSelect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) {
        return arr[left];
    }
    
    const pivotIndex = partition(arr, left, right);
    
    if (k === pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return _quickSelect(arr, left, pivotIndex - 1, k);
    } else {
        return _quickSelect(arr, pivotIndex + 1, right, k);
    }
}

function partition(arr: number[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left;
    
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}

// Example usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(quickSelect(numbers, 2)); // Output: 2
class MinHeap {
    private heap: number[] = [];
    
    constructor(arr: number[]) {
        this.heap = [...arr];
        this.buildHeap();
    }
    
    private buildHeap(): void {
        for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
            this.heapify(i);
        }
    }
    
    private heapify(i: number): void {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let smallest = i;
        
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        
        if (smallest !== i) {
            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            this.heapify(smallest);
        }
    }
    
    public extractMin(): number {
        if (this.heap.length === 0) throw new Error('Heap is empty');
        
        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapify(0);
        
        return min;
    }
}

function kthSmallestHeap(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const heap = new MinHeap(arr);
    let result = 0;
    
    for (let i = 0; i < k; i++) {
        result = heap.extractMin();
    }
    
    return result;
}

// Example usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(kthSmallestHeap(numbers, 2)); // Output: 2
function kthSmallest<T>(arr: T[], k: number, compareFn?: (a: T, b: T) => number): T {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const comparator = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    const sorted = [...arr].sort(comparator);
    return sorted[k - 1];
}

// Example usage with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

console.log(kthSmallest(people, 2, (a, b) => a.age - b.age)); 
// Output: { name: "Alice", age: 30 }
