function kthSmallestSort(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("Invalid k value");
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Example usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestSort(arr, 3)); // Output: 7
function kthSmallestQuickSelect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("Invalid k value");
    }
    
    return quickSelect([...arr], 0, arr.length - 1, k - 1);
}

function quickSelect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) {
        return arr[left];
    }
    
    const pivotIndex = partition(arr, left, right);
    
    if (k === pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return quickSelect(arr, left, pivotIndex - 1, k);
    } else {
        return quickSelect(arr, pivotIndex + 1, right, k);
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
console.log(kthSmallestQuickSelect(arr, 3)); // Output: 7
class MinHeap {
    private heap: number[] = [];
    
    constructor(arr?: number[]) {
        if (arr) {
            this.buildHeap(arr);
        }
    }
    
    private buildHeap(arr: number[]): void {
        this.heap = [...arr];
        for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
            this.heapify(i);
        }
    }
    
    private heapify(index: number): void {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallest = index;
        
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }
        
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }
        
        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapify(smallest);
        }
    }
    
    extractMin(): number {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapify(0);
        
        return min;
    }
    
    size(): number {
        return this.heap.length;
    }
}

function kthSmallestHeap(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("Invalid k value");
    }
    
    const heap = new MinHeap(arr);
    let result = 0;
    
    for (let i = 0; i < k; i++) {
        result = heap.extractMin();
    }
    
    return result;
}

// Example usage
console.log(kthSmallestHeap(arr, 3)); // Output: 7
function kthSmallest<T>(arr: T[], k: number, compareFn?: (a: T, b: T) => number): T {
    if (k < 1 || k > arr.length) {
        throw new Error("Invalid k value");
    }
    
    const defaultCompare = (a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };
    
    const comparator = compareFn || defaultCompare;
    const sorted = [...arr].sort(comparator);
    return sorted[k - 1];
}

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 20 },
    { name: "Charlie", age: 30 }
];

const thirdYoungest = kthSmallest(people, 2, (a, b) => a.age - b.age);
console.log(thirdYoungest); // Output: { name: "Alice", age: 25 }
