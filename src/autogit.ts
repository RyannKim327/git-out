function kthSmallestSorted(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    return arr
        .slice() // Create a copy to avoid mutating original array
        .sort((a, b) => a - b)[k - 1];
}

// Example usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestSorted(arr, 3)); // Output: 7
function kthSmallestQuickselect(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    // Work on a copy to avoid mutating original
    const nums = [...arr];
    
    return quickselect(nums, 0, nums.length - 1, k - 1);
}

function quickselect(nums: number[], left: number, right: number, k: number): number {
    if (left === right) {
        return nums[left];
    }
    
    const pivotIndex = partition(nums, left, right);
    
    if (k === pivotIndex) {
        return nums[pivotIndex];
    } else if (k < pivotIndex) {
        return quickselect(nums, left, pivotIndex - 1, k);
    } else {
        return quickselect(nums, pivotIndex + 1, right, k);
    }
}

function partition(nums: number[], left: number, right: number): number {
    let pivot = nums[right];
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            i++;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    
    [nums[i + 1], nums[right]] = [nums[right], nums[i + 1]];
    return i + 1;
}

// Example usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestQuickselect(arr, 3)); // Output: 7
class MinHeap {
    private heap: number[] = [];
    
    insert(value: number): void {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }
    
    extractMin(): number | null {
        if (this.heap.length === 0) return null;
        
        if (this.heap.length === 1) {
            return this.heap.pop()!;
        }
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown(0);
        return min;
    }
    
    size(): number {
        return this.heap.length;
    }
    
    private heapifyUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) {
                break;
            }
            [this.heap[parentIndex], this.heap[index]] = 
                [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    
    private heapifyDown(index: number): void {
        const size = this.heap.length;
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            
            if (left < size && this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            
            if (right < size && this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }
            
            if (smallest === index) {
                break;
            }
            
            [this.heap[index], this.heap[smallest]] = 
                [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

function kthSmallestHeap(arr: number[], k: number): number {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    if (k === 1) return Math.min(...arr);
    if (k === arr.length) return Math.max(...arr);
    
    const heap = new MinHeap();
    
    for (let i = 0; i < arr.length; i++) {
        if (heap.size() < k) {
            heap.insert(arr[i]);
        } else if (arr[i] < heap.heap[0]) {
            heap.extractMin();
            heap.insert(arr[i]);
        }
    }
    
    return heap.heap[0];
}

// Example usage
const arr = [7, 10, 4, 3, 20, 15];
console.log(kthSmallestHeap(arr, 3)); // Output: 7
function kthSmallest<T>(arr: T[], k: number, compareFn?: (a: T, b: T) => number): T {
    if (k < 1 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const sorted = [...arr].sort(compareFn);
    return sorted[k - 1];
}

// For numbers (default)
const numbers = [7, 10, 4, 3, 20, 15];
console.log(kthSmallest(numbers, 3)); // Output: 7

// For strings
const strings = ["banana", "apple", "cherry", "date"];
console.log(kthSmallest(strings, 2)); // Output: "apple"

// Custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 }
];

const byAge = (a: Person, b: Person) => a.age - b.age;
console.log(kthSmallest(people, 2, byAge)); // Output: { name: "Bob", age: 25 }
