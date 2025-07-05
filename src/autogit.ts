function kthSmallestSorting(arr: number[], k: number): number | null {
    if (k < 1 || k > arr.length) {
        return null; // k is out of bounds
    }
    
    arr.sort((a, b) => a - b); // Sort the array in ascending order
    return arr[k - 1]; // Return the kth smallest element
}

// Example usage
const array = [7, 10, 4, 3, 20, 15];
const k = 3;
const result = kthSmallestSorting(array, k);
console.log(result); // Output: 7
function partition(arr: number[], left: number, right: number, pivotIndex: number): number {
    const pivotValue = arr[pivotIndex];
    // Move pivot to end
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
            storeIndex++;
        }
    }
    // Move pivot to its final place
    [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];
    return storeIndex;
}

function quickSelect(arr: number[], left: number, right: number, k: number): number {
    if (left === right) {
        return arr[left]; // If the list contains only one element
    }

    const pivotIndex = Math.floor((right + left) / 2);
    const newPivotIndex = partition(arr, left, right, pivotIndex);

    // The pivot is in its final sorted position
    if (k === newPivotIndex) {
        return arr[k];
    } else if (k < newPivotIndex) {
        return quickSelect(arr, left, newPivotIndex - 1, k);
    } else {
        return quickSelect(arr, newPivotIndex + 1, right, k);
    }
}

function kthSmallestQuickSelect(arr: number[], k: number): number | null {
    if (k < 1 || k > arr.length) {
        return null; // k is out of bounds
    }
    
    return quickSelect(arr, 0, arr.length - 1, k - 1); // k - 1 for zero-based index
}

// Example usage
const arrayQuickSelect = [7, 10, 4, 3, 20, 15];
const kQuickSelect = 3;
const resultQuickSelect = kthSmallestQuickSelect(arrayQuickSelect, kQuickSelect);
console.log(resultQuickSelect); // Output: 7
