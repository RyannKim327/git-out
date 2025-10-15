/**
 * QuickSort Algorithm Implementation
 * Sorts an array of numbers in ascending order using the partitioning method
 */

function quickSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
    // If array has 0 or 1 elements, it's already sorted
    if (arr.length <= 1) {
        return arr;
    }

    // Use default comparison if none provided
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    // Choose pivot (middle element for better performance)
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];

    // Partition the array
    const left: T[] = [];
    const right: T[] = [];
    const middle: T[] = [];

    for (const element of arr) {
        const comparison = compare(element, pivot);
        if (comparison < 0) {
            left.push(element);
        } else if (comparison > 0) {
            right.push(element);
        } else {
            middle.push(element);
        }
    }

    // Recursively sort sub-arrays and combine
    return [
        ...quickSort(left, compare),
        ...middle,
        ...quickSort(right, compare)
    ];
}

// Example usage and testing
function demonstrateQuickSort(): void {
    // Test with numbers
    const numbers = [64, 34, 25, 12, 22, 11, 90, 42];
    console.log('Original array:', numbers);
    const sortedNumbers = quickSort(numbers);
    console.log('Sorted numbers:', sortedNumbers);
    console.log('Is sorted?', isSorted(sortedNumbers));

    // Test with strings
    const words = ['banana', 'apple', 'cherry', 'date', 'elderberry'];
    console.log('\nOriginal words:', words);
    const sortedWords = quickSort(words);
    console.log('Sorted words:', sortedWords);

    // Test with custom comparator (descending order)
    const descendingNumbers = quickSort(numbers, (a, b) => {
        if (a < b) return 1;  // Reverse comparison
        if (a > b) return -1;
        return 0;
    });
    console.log('\nDescending order:', descendingNumbers);
}

// Helper function to verify if array is sorted
function isSorted<T>(arr: T[], compareFn?: (a: T, b: T) => number): boolean {
    const compare = compareFn || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (let i = 0; i < arr.length - 1; i++) {
        if (compare(arr[i], arr[i + 1]) > 0) {
            return false;
        }
    }
    return true;
}

// Generic interface for sortable items (optional enhancement)
interface Sortable {
    value: number;
    id: string;
}

// Run the demonstration
if (require.main === module) {
    demonstrateQuickSort();
}

// Export for use in other modules
export { quickSort, isSorted, demonstrateQuickSort };
