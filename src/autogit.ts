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

    function quickSelect(left: number, right: number): number {
        if (left === right) {
            return arr[left];
        }

        const pivotIndex = partition(left, right);
        
        if (k - 1 === pivotIndex) {
            return arr[pivotIndex];
        } else if (k - 1 < pivotIndex) {
            return quickSelect(left, pivotIndex - 1);
        } else {
            return quickSelect(pivotIndex + 1, right);
        }
    }

    function partition(left: number, right: number): number {
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

    return quickSelect(0, arr.length - 1);
}
function kthSmallestMaxHeap(arr: number[], k: number): number {
    if (k <= 0 || k > arr.length) {
        throw new Error("k is out of bounds");
    }

    const maxHeap: number[] = [];
    
    // Helper functions for max heap
    function heapifyUp() {
        let index = maxHeap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (maxHeap[parentIndex] >= maxHeap[index]) break;
            [maxHeap[parentIndex], maxHeap[index]] = [maxHeap[index], maxHeap[parentIndex]];
            index = parentIndex;
        }
    }

    function heapifyDown() {
        let index = 0;
        const length = maxHeap.length;
        
        while (true) {
            let leftChild = 2 * index + 1;
            let rightChild = 2 * index + 2;
            let largest = index;
            
            if (leftChild < length && maxHeap[leftChild] > maxHeap[largest]) {
                largest = leftChild;
            }
            
            if (rightChild < length && maxHeap[rightChild] > maxHeap[largest]) {
                largest = rightChild;
            }
            
            if (largest === index) break;
            
            [maxHeap[index], maxHeap[largest]] = [maxHeap[largest], maxHeap[index]];
            index = largest;
        }
    }

    // Build max heap with first k elements
    for (let i = 0; i < k; i++) {
        maxHeap.push(arr[i]);
        heapifyUp();
    }

    // Process remaining elements
    for (let i = k; i < arr.length; i++) {
        if (arr[i] < maxHeap[0]) {
            maxHeap[0] = arr[i];
            heapifyDown();
        }
    }

    return maxHeap[0];
}
const numbers = [3, 2, 1, 5, 6, 4];
const k = 2;

console.log(kthSmallestSorting(numbers, k));        // 2
console.log(kthSmallestQuickSelect(numbers, k));    // 2
console.log(kthSmallestMaxHeap(numbers, k));        // 2

// With TypeScript generics for reusability
function kthSmallestGeneric<T>(arr: T[], k: number, compare: (a: T, b: T) => number): T {
    if (k <= 0 || k > arr.length) {
        throw new Error("k is out of bounds");
    }
    
    const sorted = [...arr].sort(compare);
    return sorted[k - 1];
}

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
];

const secondYoungest = kthSmallestGeneric(people, 2, (a, b) => a.age - b.age);
console.log(secondYoungest); // { name: "Alice", age: 25 }
