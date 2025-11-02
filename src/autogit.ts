function kthSmallestSort(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(kthSmallestSort(numbers, 2)); // Output: 2
function kthSmallestQuickSelect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    return quickSelect([...arr], 0, arr.length - 1, k - 1);
}

function quickSelect(
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

// Usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(kthSmallestQuickSelect(numbers, 2)); // Output: 2
class MinHeap {
    private heap: number[];
    
    constructor() {
        this.heap = [];
    }
    
    push(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop(): number | undefined {
        if (this.heap.length === 0) return undefined;
        
        const min = this.heap[0];
        const end = this.heap.pop()!;
        
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        
        return min;
    }
    
    private bubbleUp(index: number): void {
        const element = this.heap[index];
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            
            if (element >= parent) break;
            
            this.heap[parentIndex] = element;
            this.heap[index] = parent;
            index = parentIndex;
        }
    }
    
    private sinkDown(index: number): void {
        const length = this.heap.length;
        const element = this.heap[index];
        
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swap: number | null = null;
            let leftChild: number, rightChild: number;
            
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild < element) {
                    swap = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild < element) ||
                    (swap !== null && rightChild < leftChild!)
                ) {
                    swap = rightChildIndex;
                }
            }
            
            if (swap === null) break;
            
            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }
}

function kthSmallestHeap(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const heap = new MinHeap();
    for (const num of arr) {
        heap.push(num);
    }
    
    let result = 0;
    for (let i = 0; i < k; i++) {
        result = heap.pop()!;
    }
    
    return result;
}

// Usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(kthSmallestHeap(numbers, 2)); // Output: 2
const kthSmallest = (arr: number[], k: number): number => 
    [...arr].sort((a, b) => a - b)[k - 1];

// Usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(kthSmallest(numbers, 2)); // Output: 2
