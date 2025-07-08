function countOccurrences(text: string, word: string): number {
    // Create a regular expression to match the word
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // 'g' for global, 'i' for case-insensitive
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Example usage:
const text = "The quick brown fox jumps over the lazy dog. The fox is clever.";
const word = "the";
const count = countOccurrences(text, word);

console.log(`The word "${word}" occurs ${count} times.`);
