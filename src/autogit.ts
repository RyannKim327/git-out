function kthSmallestSimple(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Example usage
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(kthSmallestSimple(numbers, 3)); // Output: 2 (3rd smallest)
function kthSmallestQuickSelect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
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
console.log(kthSmallestQuickSelect(numbers, 3)); // Output: 2
class MinHeap {
    private heap: number[] = [];
    
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
        if (this.heap.length === 0) throw new Error('Heap is empty');
        
        const min = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown(0);
        
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
console.log(kthSmallestHeap(numbers, 3)); // Output: 2
function kthSmallestGeneric<T>(
    arr: T[], 
    k: number, 
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T {
    if (k < 1 || k > arr.length) {
        throw new Error('k is out of bounds');
    }
    
    const sorted = [...arr].sort(compareFn);
    return sorted[k - 1];
}

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 20 },
    { name: 'Charlie', age: 30 }
];

const thirdYoungest = kthSmallestGeneric(people, 2, (a, b) => a.age - b.age);
console.log(thirdYoungest); // Output: { name: 'Alice', age: 25 }
