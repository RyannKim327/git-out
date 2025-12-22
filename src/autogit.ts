function bogosort<T>(array: T[]): T[] {
    // Helper function to check if array is sorted
    function isSorted(arr: T[]): boolean {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                return false;
            }
        }
        return true;
    }

    // Helper function to shuffle array randomly
    function shuffle(arr: T[]): T[] {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Keep shuffling until the array is sorted
    let sortedArray = [...array];
    let attempts = 0;
    
    while (!isSorted(sortedArray)) {
        sortedArray = shuffle(sortedArray);
        attempts++;
        
        // Optional: Add a safety limit to prevent infinite loops
        if (attempts > 100000) {
            throw new Error('Bogosort failed to sort after 100,000 attempts');
        }
    }

    console.log(`Bogosort succeeded after ${attempts} attempts!`);
    return sortedArray;
}

// Example usage
const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('Unsorted:', unsortedArray);

try {
    const sortedArray = bogosort(unsortedArray);
    console.log('Sorted:', sortedArray);
} catch (error) {
    console.error(error.message);
}

// More practical alternative: QuickSort implementation
function quickSort<T>(array: T[]): T[] {
    if (array.length <= 1) return array;
    
    const pivot = array[Math.floor(array.length / 2)];
    const left: T[] = [];
    const right: T[] = [];
    
    for (let i = 0; i < array.length; i++) {
        if (i === Math.floor(array.length / 2)) continue;
        
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log('QuickSort result:', quickSort(unsortedArray));
