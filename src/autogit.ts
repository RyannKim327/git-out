function heapSort(arr: number[]): number[] {
    let n = arr.length;

    // Step 1: Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Step 2: Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to the end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

// Heapify subtree rooted at index i
function heapify(arr: number[], heapSize: number, i: number) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < heapSize && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < heapSize && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, heapSize, largest);
    }
}

// Example usage:
const numbers = [4, 10, 3, 5, 1];
console.log(heapSort(numbers)); // [1, 3, 4, 5, 10]
