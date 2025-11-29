function fisherYatesShuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // Swap it with the current element
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = 
        [shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }
    
    return shuffledArray;
}

// Example usage with different types
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const strings = ["apple", "banana", "cherry", "date", "elderberry"];
const objects = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

console.log("Shuffled numbers:", fisherYatesShuffle(numbers));
console.log("Shuffled strings:", fisherYatesShuffle(strings));
console.log("Shuffled objects:", fisherYatesShuffle(objects));

// Verify original arrays are unchanged
console.log("Original arrays:", { numbers, strings, objects });
