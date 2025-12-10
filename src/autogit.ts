function insertionSort<T>(array: T[], comparator?: (a: T, b: T) => number): T[] {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...array];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const currentElement = sortedArray[i];
        let j = i - 1;
        
        // Move elements that are greater than currentElement one position ahead
        while (j >= 0 && (
            comparator 
                ? comparator(sortedArray[j], currentElement) > 0
                : sortedArray[j] > currentElement
        )) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        // Insert currentElement at the correct position
        sortedArray[j + 1] = currentElement;
    }
    
    return sortedArray;
}

// Example usage with numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
console.log("Sorted:", insertionSort(numbers));

// Example usage with strings
const strings = ["banana", "apple", "cherry", "date"];
console.log("Original:", strings);
console.log("Sorted:", insertionSort(strings));

// Example with custom comparator (sorting by length)
const words = ["apple", "banana", "kiwi", "grapefruit"];
console.log("Original:", words);
console.log("Sorted by length:", insertionSort(words, (a, b) => a.length - b.length));

// In-place version (modifies the original array)
function insertionSortInPlace<T>(array: T[], comparator?: (a: T, b: T) => number): void {
    for (let i = 1; i < array.length; i++) {
        const currentElement = array[i];
        let j = i - 1;
        
        while (j >= 0 && (
            comparator 
                ? comparator(array[j], currentElement) > 0
                : array[j] > currentElement
        )) {
            array[j + 1] = array[j];
            j--;
        }
        
        array[j + 1] = currentElement;
    }
}

// Example with in-place sorting
const numbersToSort = [64, 34, 25, 12, 22, 11, 90];
console.log("Before in-place sort:", numbersToSort);
insertionSortInPlace(numbersToSort);
console.log("After in-place sort:", numbersToSort);

// Generic interface version
interface Sortable<T> {
    sort(comparator?: (a: T, b: T) => number): void;
    getArray(): T[];
}

class InsertionSortArray<T> implements Sortable<T> {
    private array: T[];
    
    constructor(array: T[]) {
        this.array = [...array];
    }
    
    sort(comparator?: (a: T, b: T) => number): void {
        for (let i = 1; i < this.array.length; i++) {
            const currentElement = this.array[i];
            let j = i - 1;
            
            while (j >= 0 && (
                comparator 
                    ? comparator(this.array[j], currentElement) > 0
                    : this.array[j] > currentElement
            )) {
                this.array[j + 1] = this.array[j];
                j--;
            }
            
            this.array[j + 1] = currentElement;
        }
    }
    
    getArray(): T[] {
        return [...this.array];
    }
}

// Example with class-based approach
const sortableNumbers = new InsertionSortArray([64, 34, 25, 12, 22, 11, 90]);
console.log("Before class sort:", sortableNumbers.getArray());
sortableNumbers.sort();
console.log("After class sort:", sortableNumbers.getArray());
