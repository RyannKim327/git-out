function kthSmallestSorting(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}

// Example usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestSorting(arr, 3)); // Output: 7
function quickselect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    return quickselectHelper([...arr], 0, arr.length - 1, k - 1);
}

function quickselectHelper(
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
        return quickselectHelper(arr, left, pivotIndex - 1, k);
    } else {
        return quickselectHelper(arr, pivotIndex + 1, right, k);
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
const arr = [7, 10, 4, 3, 20, 15];
console.log(quickselect(arr, 3)); // Output: 7
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
        if (this.heap.length === 0) {
            throw new Error("Heap is empty");
        }
        
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
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] <= this.heap[index]) break;
            
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }
    
    private sinkDown(index: number): void {
        const length = this.heap.length;
        
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let swap = null;
            
            if (leftChild < length && this.heap[leftChild] < this.heap[index]) {
                swap = leftChild;
            }
            
            if (rightChild < length) {
                if ((swap === null && this.heap[rightChild] < this.heap[index]) ||
                    (swap !== null && this.heap[rightChild] < this.heap[leftChild])) {
                    swap = rightChild;
                }
            }
            
            if (swap === null) break;
            
            [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
            index = swap;
        }
    }
}

function kthSmallestHeap(arr: number[], k: number): number {
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

// Example usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestHeap(arr, 3)); // Output: 7
function kthSmallest<T>(arr: T[], k: number, compare?: (a: T, b: T) => number): T {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const comparator = compare || ((a: T, b: T) => {
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
    { name: "Alice", age: 25 },
    { name: "Bob", age: 20 },
    { name: "Charlie", age: 30 }
];

const thirdYoungest = kthSmallest(people, 2, (a, b) => a.age - b.age);
console.log(thirdYoungest); // { name: "Alice", age: 25 }
