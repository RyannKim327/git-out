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

// Example usage
console.log(kthSmallestQuickSelect(arr, 3)); // Output: 7
class MinHeap {
    private heap: number[];
    
    constructor() {
        this.heap = [];
    }
    
    insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp();
    }
    
    extractMin(): number {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        
        const min = this.heap[0];
        const last = this.heap.pop()!;
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown();
        }
        
        return min;
    }
    
    private bubbleUp(): void {
        let index = this.heap.length - 1;
        
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.heap[parentIndex] <= this.heap[index]) break;
            
            [this.heap[parentIndex], this.heap[index]] = 
                [this.heap[index], this.heap[parentIndex]];
            
            index = parentIndex;
        }
    }
    
    private sinkDown(): void {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swap = null;
            let leftChild, rightChild;
            
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild < element) {
                    swap = leftChildIndex;
                }
            }
            
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if ((swap === null && rightChild < element) || 
                    (swap !== null && rightChild < leftChild!)) {
                    swap = rightChildIndex;
                }
            }
            
            if (swap === null) break;
            
            [this.heap[index], this.heap[swap]] = 
                [this.heap[swap], this.heap[index]];
            
            index = swap;
        }
    }
}

function kthSmallestHeap(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("Invalid k value");
    }
    
    const heap = new MinHeap();
    arr.forEach(num => heap.insert(num));
    
    let result = 0;
    for (let i = 0; i < k; i++) {
        result = heap.extractMin();
    }
    
    return result;
}

// Example usage
console.log(kthSmallestHeap(arr, 3)); // Output: 7
const kthSmallest = (arr: number[], k: number): number => 
    [...arr].sort((a, b) => a - b)[k - 1];

console.log(kthSmallest(arr, 3)); // Output: 7
