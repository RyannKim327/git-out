function findKthSmallestSorted(arr: number[], k: number): number | undefined {
    // Handle edge cases
    if (arr.length === 0 || k <= 0 || k > arr.length) {
        return undefined; // Or throw an error
    }

    // Create a copy of the array to avoid modifying the original
    const sortedArr = [...arr].sort((a, b) => a - b);

    // The k-th smallest element will be at index k-1
    return sortedArr[k - 1];
}

// --- Example Usage ---
const numbers1 = [3, 2, 1, 5, 6, 4];
console.log("--- Sort and Pick ---");
console.log(`Array: [${numbers1}]`);
console.log(`1st smallest: ${findKthSmallestSorted(numbers1, 1)}`); // Expected: 1
console.log(`3rd smallest: ${findKthSmallestSorted(numbers1, 3)}`); // Expected: 3
console.log(`6th smallest: ${findKthSmallestSorted(numbers1, 6)}`); // Expected: 6

const numbers2 = [7, 10, 4, 3, 20, 15];
console.log(`Array: [${numbers2}]`);
console.log(`4th smallest: ${findKthSmallestSorted(numbers2, 4)}`); // Expected: 10

console.log(`Invalid k (0): ${findKthSmallestSorted(numbers1, 0)}`); // Expected: undefined
console.log(`Invalid k (7): ${findKthSmallestSorted(numbers1, 7)}`); // Expected: undefined
console.log(`Empty array: ${findKthSmallestSorted([], 1)}`); // Expected: undefined
function findKthSmallestQuickselect(arr: number[], k: number): number | undefined {
    // Handle edge cases
    if (arr.length === 0 || k <= 0 || k > arr.length) {
        return undefined;
    }

    // Create a mutable copy of the array as Quickselect modifies it in-place
    const mutableArr = [...arr];
    const kIndex = k - 1; // Convert k to 0-indexed

    // Helper function to swap two elements in the array
    function swap(arr: number[], i: number, j: number): void {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Partition function (Lomuto partition scheme is common)
    // Rearranges elements such that elements <= pivot are to its left, > pivot to its right.
    // Returns the final index of the pivot.
    function partition(arr: number[], left: number, right: number): number {
        // We'll use the last element as the pivot for simplicity
        // For better average case performance, a random pivot can be chosen:
        // const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
        // swap(arr, pivotIndex, right); // Move random pivot to the end
        
        const pivotValue = arr[right];
        let i = left; // Index of smaller element

        for (let j = left; j < right; j++) {
            if (arr[j] <= pivotValue) {
                swap(arr, i, j);
                i++;
            }
        }
        swap(arr, i, right); // Put pivot in its correct position
        return i;
    }

    // Recursive Quickselect function
    function quickselect(arr: number[], left: number, right: number, targetIndex: number): number {
        if (left === right) {
            return arr[left]; // Base case: only one element in the subarray
        }

        const pivotFinalIndex = partition(arr, left, right);

        if (targetIndex === pivotFinalIndex) {
            return arr[targetIndex]; // Found the k-th smallest element
        } else if (targetIndex < pivotFinalIndex) {
            // Target is in the left partition
            return quickselect(arr, left, pivotFinalIndex - 1, targetIndex);
        } else {
            // Target is in the right partition
            return quickselect(arr, pivotFinalIndex + 1, right, targetIndex);
        }
    }

    return quickselect(mutableArr, 0, mutableArr.length - 1, kIndex);
}

// --- Example Usage ---
const numbers3 = [3, 2, 1, 5, 6, 4];
console.log("\n--- Quickselect ---");
console.log(`Array: [${numbers3}]`);
console.log(`1st smallest: ${findKthSmallestQuickselect(numbers3, 1)}`); // Expected: 1
console.log(`3rd smallest: ${findKthSmallestQuickselect(numbers3, 3)}`); // Expected: 3
console.log(`6th smallest: ${findKthSmallestQuickselect(numbers3, 6)}`); // Expected: 6

const numbers4 = [7, 10, 4, 3, 20, 15];
console.log(`Array: [${numbers4}]`);
console.log(`4th smallest: ${findKthSmallestQuickselect(numbers4, 4)}`); // Expected: 10

console.log(`Invalid k (0): ${findKthSmallestQuickselect(numbers3, 0)}`); // Expected: undefined
console.log(`Invalid k (7): ${findKthSmallestQuickselect(numbers3, 7)}`); // Expected: undefined
console.log(`Empty array: ${findKthSmallestQuickselect([], 1)}`); // Expected: undefined
// --- Max-Heap Implementation (Simplified for demonstration) ---
// In a real scenario, you'd use a more robust heap library or implementation.
class MaxHeap {
    private heap: number[] = [];

    size(): number {
        return this.heap.length;
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    peek(): number | undefined {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    insert(value: number): void {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMax(): number | undefined {
        if (this.isEmpty()) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop()!; // Move last element to root
        this.bubbleDown(0);
        return max;
    }

    private bubbleUp(index: number): void {
        let parentIndex = Math.floor((index - 1) / 2);
        while (index > 0 && this.heap[index] > this.heap[parentIndex]) {
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }
    }

    private bubbleDown(index: number): void {
        let largestIndex = index;
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;

        if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] > this.heap[largestIndex]) {
            largestIndex = leftChildIndex;
        }
        if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] > this.heap[largestIndex]) {
            largestIndex = rightChildIndex;
        }

        if (largestIndex !== index) {
            [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
            this.bubbleDown(largestIndex);
        }
    }
}

function findKthSmallestWithHeap(arr: number[], k: number): number | undefined {
    // Handle edge cases
    if (arr.length === 0 || k <= 0 || k > arr.length) {
        return undefined;
    }

    const maxHeap = new MaxHeap();

    for (let i = 0; i < arr.length; i++) {
        if (maxHeap.size() < k) {
            maxHeap.insert(arr[i]);
        } else if (arr[i] < maxHeap.peek()!) { // If current element is smaller than heap's max
            maxHeap.extractMax(); // Remove max
            maxHeap.insert(arr[i]); // Add current element
        }
    }

    return maxHeap.peek(); // The max element in the heap is the k-th smallest
}

// --- Example Usage ---
const numbers5 = [3, 2, 1, 5, 6, 4];
console.log("\n--- Using Max-Heap ---");
console.log(`Array: [${numbers5}]`);
console.log(`1st smallest: ${findKthSmallestWithHeap(numbers5, 1)}`); // Expected: 1
console.log(`3rd smallest: ${findKthSmallestWithHeap(numbers5, 3)}`); // Expected: 3
console.log(`6th smallest: ${findKthSmallestWithHeap(numbers5, 6)}`); // Expected: 6

const numbers6 = [7, 10, 4, 3, 20, 15];
console.log(`Array: [${numbers6}]`);
console.log(`4th smallest: ${findKthSmallestWithHeap(numbers6, 4)}`); // Expected: 10

console.log(`Invalid k (0): ${findKthSmallestWithHeap(numbers5, 0)}`); // Expected: undefined
console.log(`Invalid k (7): ${findKthSmallestWithHeap(numbers5, 7)}`); // Expected: undefined
console.log(`Empty array: ${findKthSmallestWithHeap([], 1)}`); // Expected: undefined
