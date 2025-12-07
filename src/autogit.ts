function findKthSmallestSort(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Usage
const numbers = [3, 2, 1, 5, 6, 4];
console.log(findKthSmallestSort(numbers, 2)); // Output: 2
function findKthSmallestQuickselect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }

    const quickselect = (
        nums: number[], 
        left: number, 
        right: number, 
        kSmallest: number
    ): number => {
        if (left === right) return nums[left];
        
        const pivotIndex = partition(nums, left, right);
        
        if (kSmallest === pivotIndex) {
            return nums[kSmallest];
        } else if (kSmallest < pivotIndex) {
            return quickselect(nums, left, pivotIndex - 1, kSmallest);
        } else {
            return quickselect(nums, pivotIndex + 1, right, kSmallest);
        }
    };

    const partition = (nums: number[], left: number, right: number): number => {
        const pivot = nums[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (nums[j] <= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        
        [nums[i], nums[right]] = [nums[right], nums[i]];
        return i;
    };

    return quickselect([...arr], 0, arr.length - 1, k - 1);
}

// Usage
console.log(findKthSmallestQuickselect(numbers, 2)); // Output: 2
class MinHeap {
    private heap: number[];
    
    constructor() {
        this.heap = [];
    }
    
    insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }
    
    extractMin(): number {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        
        const min = this.heap[0];
        const last = this.heap.pop()!;
        
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.sinkDown(0);
        }
        
        return min;
    }
    
    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] >= this.heap[parentIndex]) break;
            
            [this.heap[index], this.heap[parentIndex]] = 
                [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }
    
    private sinkDown(index: number): void {
        const length = this.heap.length;
        
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            
            if (leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }
            
            if (rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }
            
            if (smallest === index) break;
            
            [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

function findKthSmallestHeap(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const heap = new MinHeap();
    arr.forEach(num => heap.insert(num));
    
    let result = 0;
    for (let i = 0; i < k; i++) {
        result = heap.extractMin();
    }
    
    return result;
}

// Usage
console.log(findKthSmallestHeap(numbers, 2)); // Output: 2
const findKthSmallest = (arr: number[], k: number): number => 
    [...arr].sort((a, b) => a - b)[k - 1];

// Usage
console.log(findKthSmallest(numbers, 2)); // Output: 2
function findKthSmallest(
    arr: number[], 
    k: number, 
    method: 'sort' | 'quickselect' | 'heap' = 'quickselect'
): number {
    if (k < 1 || k > arr.length) {
        throw new Error(`k must be between 1 and ${arr.length}`);
    }
    
    switch (method) {
        case 'sort':
            return findKthSmallestSort(arr, k);
        case 'quickselect':
            return findKthSmallestQuickselect(arr, k);
        case 'heap':
            return findKthSmallestHeap(arr, k);
        default:
            throw new Error('Invalid method');
    }
}

// Test all methods
const testArray = [3, 2, 1, 5, 6, 4];
const k = 3;

console.log('Sort method:', findKthSmallest(testArray, k, 'sort'));
console.log('Quickselect method:', findKthSmallest(testArray, k, 'quickselect'));
console.log('Heap method:', findKthSmallest(testArray, k, 'heap'));
