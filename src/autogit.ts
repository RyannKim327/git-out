/**
 * Randomly shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Checks if an array is sorted in ascending order
 */
function isSorted<T>(array: T[]): boolean {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false;
        }
    }
    return true;
}

/**
 * Bogo Sort - The worst possible sorting algorithm
 * Time Complexity: O(∞) in worst case, O(n!) in average case
 * Space Complexity: O(1)
 */
function bogoSort<T>(array: T[]): T[] {
    let attempts = 0;
    let sortedArray = [...array];
    
    while (!isSorted(sortedArray)) {
        sortedArray = shuffleArray(sortedArray);
        attempts++;
        
        // Optional: log progress for entertainment
        if (attempts % 1000 === 0) {
            console.log(`Attempt ${attempts}... still sorting...`);
        }
    }
    
    console.log(`Sorted after ${attempts} attempts!`);
    return sortedArray;
}

// Example usage with different data types
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
console.log('Original:', numbers);
console.log('Sorted:', bogoSort(numbers));

const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Original:', strings);
console.log('Sorted:', bogoSort(strings));

// Generic function demonstration
const mixedTypes = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
];

// Sort objects by age using Bogo Sort
const sortedByAge = bogoSort(mixedTypes.map(obj => obj.age));
console.log('Ages sorted:', sortedByAge);

// Warning: Don't use this for large arrays!
// For arrays larger than 10 elements, this might take... a while.
// Actually, for arrays larger than 15 elements, it might take longer than the universe has existed.
