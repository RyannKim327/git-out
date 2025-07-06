function heapSort(arr: number[]): number[] {
    const n = arr.length;

    // Step 1: Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Step 2: Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root (max element) to the end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

// To maintain the max heap property
function heapify(arr: number[], heapSize: number, rootIndex: number): void {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    // If left child exists and is greater than root
    if (leftChild < heapSize && arr[leftChild] > arr[largest]) {
        largest = leftChild;
    }

    // If right child exists and is greater than current largest
    if (rightChild < heapSize && arr[rightChild] > arr[largest]) {
        largest = rightChild;
    }

    // If largest is not root
    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
        // Recursively heapify the affected sub-tree
        heapify(arr, heapSize, largest);
    }
}

// Example usage:
const array = [12, 11, 13, 5, 6, 7];
console.log('Original array:', array);
heapSort(array);
console.log('Sorted array:', array);
