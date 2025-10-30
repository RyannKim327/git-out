function countWordOccurrences(text: string, word: string): number {
    // Escape special regex characters in the word
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Match whole words only (word boundaries)
    const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
    const matches = text.match(regex);
    
    return matches ? matches.length : 0;
}

// Example usage
const text = "The quick brown fox jumps over the lazy dog. The fox is quick.";
console.log(countWordOccurrences(text, "the")); // 2
console.log(countWordOccurrences(text, "fox")); // 2
console.log(countWordOccurrences(text, "quick")); // 2
function countWordOccurrences(text: string, word: string): number {
    // Convert to lowercase for case-insensitive matching
    const lowerText = text.toLowerCase();
    const lowerWord = word.toLowerCase();
    
    // Split by word boundaries and filter
    const words = lowerText.split(/\s+/);
    return words.filter(w => w === lowerWord).length;
}

// Example usage
const text = "The quick brown fox jumps over the lazy dog. The fox is quick.";
console.log(countWordOccurrences(text, "the")); // 2
console.log(countWordOccurrences(text, "fox")); // 2
function countWordOccurrences(text: string, word: string): number {
    // Case-insensitive whole word match
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    return (text.match(regex) || []).length;
}

// Example usage
const text = "Apple apple APPLE in the basket. Apple pie is delicious.";
console.log(countWordOccurrences(text, "apple")); // 4
function countWordOccurrences(text: string, word: string): number {
    // Remove punctuation around words and match whole words
    const cleanedText = text.replace(/[^\w\s]/g, ' ');
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = cleanedText.match(regex);
    
    return matches ? matches.length : 0;
}

// Example usage
const text = "Hello, world! Hello.world - hello?";
console.log(countWordOccurrences(text, "hello")); // 3
interface WordCounter {
    count(text: string, word: string): number;
    countAll(text: string): Map<string, number>;
}

class SimpleWordCounter implements WordCounter {
    count(text: string, word: string): number {
        if (!text || !word) return 0;
        
        const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedWord}\\b`, 'gi');
        const matches = text.match(regex);
        return matches ? matches.length : 0;
    }
    
    countAll(text: string): Map<string, number> {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const countMap = new Map<string, number>();
        
        for (const word of words) {
            countMap.set(word, (countMap.get(word) || 0) + 1);
        }
        
        return countMap;
    }
}

// Usage
const counter = new SimpleWordCounter();
const text = "The quick brown fox jumps over the lazy dog";

console.log(counter.count(text, "the")); // 2
console.log(counter.countAll(text)); 
// Map(9) { 'the' => 2, 'quick' => 1, 'brown' => 1, ... }
