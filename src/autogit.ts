function kthSmallestSort(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestSort(arr, 3)); // Output: 7
function quickSelect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    return quickSelectHelper([...arr], 0, arr.length - 1, k - 1);
}

function quickSelectHelper(
    arr: number[], 
    left: number, 
    right: number, 
    k: number
): number {
    if (left === right) {
        return arr[left];
    }
    
    const pivotIndex = partition(arr, left, right);
    
    if (k === pivotIndex) {
        return arr[k];
    } else if (k < pivotIndex) {
        return quickSelectHelper(arr, left, pivotIndex - 1, k);
    } else {
        return quickSelectHelper(arr, pivotIndex + 1, right, k);
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

// Usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(quickSelect(arr, 3)); // Output: 7
class MinHeap {
    private heap: number[];
    
    constructor(arr: number[]) {
        this.heap = [...arr];
        this.buildHeap();
    }
    
    private buildHeap(): void {
        for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
    
    private heapifyDown(index: number): void {
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
            this.heapifyDown(smallest);
        }
    }
    
    extractMin(): number {
        if (this.heap.length === 0) {
            throw new Error('Heap is empty');
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown(0);
        
        return min;
    }
    
    size(): number {
        return this.heap.length;
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

// Usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestHeap(arr, 3)); // Output: 7
function kthSmallestOneLine(arr: number[], k: number): number {
    return [...arr].sort((a, b) => a - b)[k - 1];
}

// Usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestOneLine(arr, 3)); // Output: 7
function findKthSmallest(arr: number[], k: number): number {
    // Input validation
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length === 0) {
        throw new Error('Array cannot be empty');
    }
    
    if (!Number.isInteger(k) || k < 1 || k > arr.length) {
        throw new Error(`k must be an integer between 1 and ${arr.length}`);
    }
    
    // Use quickselect for better performance on large arrays
    return quickSelect([...arr], k);
}

// Test cases
const testArrays = [
    [7, 10, 4, 3, 20, 15],
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [42],
    [3, 1, 4, 1, 5, 9, 2, 6, 5]
];

testArrays.forEach((arr, index) => {
    console.log(`Array ${index + 1}: [${arr}]`);
    for (let k = 1; k <= Math.min(3, arr.length); k++) {
        try {
            const result = findKthSmallest(arr, k);
            console.log(`  ${k}th smallest: ${result}`);
        } catch (error) {
            console.log(`  Error: ${error.message}`);
        }
    }
});
