/**
 * Swaps two elements in an array
 * @param arr - The array
 * @param i - First index
 * @param j - Second index
 */
function swap(arr: number[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Ensures the heap structure is maintained for a subtree rooted at index i
 * @param arr - The array to heapify
 * @param size - Size of the heap
 * @param i - Root index of the subtree
 */
function heapify(arr: number[], size: number, i: number): void {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child

    // If left child is larger than root
    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than current largest
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root, swap and continue heapifying
    if (largest !== i) {
        swap(arr, i, largest);
        heapify(arr, size, largest);
    }
}

/**
 * Heap Sort implementation
 * @param arr - The array to be sorted
 * @returns The sorted array
 */
function heapSort(arr: number[]): number[] {
    const n = arr.length;

    // Build max-heap (rearrange array)
    // Start from last non-leaf node (Math.floor(n/2) - 1)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end (largest element)
        swap(arr, 0, i);

        // Heapify the reduced heap (size = i)
        heapify(arr, i, 0);
    }

    return arr;
}

// Example usage:
const unsortedArray = [4, 10, 3, 5, 1];
console.log('Unsorted Array:', unsortedArray);
const sortedArray = heapSort([...unsortedArray]); // Create copy to preserve original array
console.log('Sorted Array:', sortedArray);
