function kthSmallestSorting(arr: number[], k: number): number {
    if (k <= 0 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const sorted = [...arr].sort((a, b) => a - b);
    return sorted[k - 1];
}
function kthSmallestQuickSelect(arr: number[], k: number): number {
    if (k <= 0 || k > arr.length) {
        throw new Error("k is out of bounds");
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
function kthSmallestMaxHeap(arr: number[], k: number): number {
    if (k <= 0 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const maxHeap: number[] = [];
    
    for (let i = 0; i < arr.length; i++) {
        if (maxHeap.length < k) {
            maxHeap.push(arr[i]);
            heapifyUp(maxHeap);
        } else if (arr[i] < maxHeap[0]) {
            maxHeap[0] = arr[i];
            heapifyDown(maxHeap, 0);
        }
    }
    
    return maxHeap[0];
}

function heapifyUp(heap: number[]): void {
    let index = heap.length - 1;
    while (index > 0) {
        const parent = Math.floor((index - 1) / 2);
        if (heap[index] <= heap[parent]) break;
        [heap[index], heap[parent]] = [heap[parent], heap[index]];
        index = parent;
    }
}

function heapifyDown(heap: number[], index: number): void {
    const length = heap.length;
    while (true) {
        let largest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        
        if (left < length && heap[left] > heap[largest]) {
            largest = left;
        }
        
        if (right < length && heap[right] > heap[largest]) {
            largest = right;
        }
        
        if (largest === index) break;
        
        [heap[index], heap[largest]] = [heap[largest], heap[index]];
        index = largest;
    }
}
function kthSmallest<T>(arr: T[], k: number, comparator?: (a: T, b: T) => number): T {
    if (k <= 0 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });
    
    const sorted = [...arr].sort(compare);
    return sorted[k - 1];
}

// Usage with custom comparator
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(kthSmallest(numbers, 3)); // 2

const strings = ["banana", "apple", "cherry"];
console.log(kthSmallest(strings, 2)); // "banana"

const objects = [{ value: 3 }, { value: 1 }, { value: 2 }];
console.log(kthSmallest(objects, 2, (a, b) => a.value - b.value)); // { value: 2 }
const array = [3, 1, 4, 1, 5, 9, 2, 6];

console.log(kthSmallestSorting(array, 3));    // 2
console.log(kthSmallestQuickSelect(array, 3)); // 2
console.log(kthSmallestMaxHeap(array, 3));     // 2

// Handle errors
try {
    console.log(kthSmallestSorting(array, 10)); // Throws error
} catch (error) {
    console.log(error.message); // "k is out of bounds"
}
