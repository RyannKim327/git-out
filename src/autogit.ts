function insertionSort<T>(arr: T[]): T[] {
    // Create a copy of the array to avoid mutating the original
    const sortedArray = [...arr];
    
    // Start from the second element (index 1)
    for (let i = 1; i < sortedArray.length; i++) {
        // Store the current element to be inserted
        const current = sortedArray[i];
        let j = i - 1;
        
        // Shift elements that are greater than current to the right
        while (j >= 0 && sortedArray[j] > current) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        // Insert the current element in its correct position
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}

// Generic version with custom comparator (optional)
function insertionSortWithComparator<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): T[] {
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const current = sortedArray[i];
        let j = i - 1;
        
        while (j >= 0 && comparator(sortedArray[j], current) > 0) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        sortedArray[j + 1] = current;
    }
    
    return sortedArray;
}

// Example usage:
const numbers: number[] = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", insertionSort(numbers));
// Output: [11, 12, 22, 25, 34, 64, 90]

// Example with strings:
const names: string[] = ["banana", "apple", "cherry", "date"];
console.log("Sorted names:", insertionSort(names));
// Output: ["apple", "banana", "cherry", "date"]

// Example with custom comparator (descending order)
const descendingNumbers = insertionSortWithComparator(numbers, (a, b) => (a > b ? -1 : a < b ? 1 : 0));
console.log("Descending:", descendingNumbers);
// Output: [90, 64, 34, 25, 22, 12, 11]
