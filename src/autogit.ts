function kthSmallestSort(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Example usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestSort(arr, 3)); // Output: 7
function quickSelect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
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

// Example usage
const arr2 = [7, 10, 4, 3, 20, 15];
console.log(quickSelect(arr2, 3)); // Output: 7
class MaxHeap {
    private heap: number[] = [];
    
    constructor() {}
    
    push(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    pop(): number {
        if (this.heap.length === 0) throw new Error("Heap is empty");
        
        const max = this.heap[0];
        const end = this.heap.pop()!;
        
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        
        return max;
    }
    
    peek(): number {
        return this.heap[0];
    }
    
    size(): number {
        return this.heap.length;
    }
    
    private bubbleUp(idx: number): void {
        const element = this.heap[idx];
        
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.heap[parentIdx];
            
            if (element <= parent) break;
            
            this.heap[parentIdx] = element;
            this.heap[idx] = parent;
            idx = parentIdx;
        }
    }
    
    private sinkDown(idx: number): void {
        const length = this.heap.length;
        const element = this.heap[idx];
        
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let swap: number | null = null;
            let leftChild: number, rightChild: number;
            
            if (leftChildIdx < length) {
                leftChild = this.heap[leftChildIdx];
                if (leftChild > element) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.heap[rightChildIdx];
                if (
                    (swap === null && rightChild > element) ||
                    (swap !== null && rightChild > leftChild!)
                ) {
                    swap = rightChildIdx;
                }
            }
            
            if (swap === null) break;
            
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}

function kthSmallestHeap(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const heap = new MaxHeap();
    
    // Insert first k elements
    for (let i = 0; i < k; i++) {
        heap.push(arr[i]);
    }
    
    // For remaining elements, if smaller than max in heap, replace
    for (let i = k; i < arr.length; i++) {
        if (arr[i] < heap.peek()) {
            heap.pop();
            heap.push(arr[i]);
        }
    }
    
    return heap.peek();
}

// Example usage
const arr3 = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestHeap(arr3, 3)); // Output: 7
function kthSmallestGeneric<T>(
    arr: T[], 
    k: number, 
    compareFn?: (a: T, b: T) => number
): T {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const comparator = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    const sorted = [...arr].sort(comparator);
    return sorted[k - 1];
}

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const secondYoungest = kthSmallestGeneric(people, 2, (a, b) => a.age - b.age);
console.log(secondYoungest); // Output: { name: "Alice", age: 30 }
