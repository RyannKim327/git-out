function countWordOccurrences(text: string, word: string): number {
    const words = text.split(/\s+/);
    return words.filter(w => w.toLowerCase() === word.toLowerCase()).length;
}

// Usage
const text = "Hello world hello everyone hello there";
const count = countWordOccurrences(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesRegex(text: string, word: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Usage
const text = "Hello world hello everyone hello there";
const count = countWordOccurrencesRegex(text, "hello");
console.log(count); // Output: 3
function countWordOccurrences(text: string, word: string, caseSensitive: boolean = false): number {
    const flags = caseSensitive ? 'g' : 'gi';
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedWord}\\b`, flags);
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Usage
const text = "Hello world hello everyone hello there";
console.log(countWordOccurrences(text, "hello")); // Output: 3
console.log(countWordOccurrences(text, "hello", true)); // Output: 1 (case sensitive)
interface CountOptions {
    caseSensitive?: boolean;
    wholeWord?: boolean;
}

function countWordOccurrences(
    text: string, 
    word: string, 
    options: CountOptions = {}
): number {
    const { caseSensitive = false, wholeWord = true } = options;
    
    // Escape special regex characters
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Build regex pattern
    const pattern = wholeWord ? `\\b${escapedWord}\\b` : escapedWord;
    const flags = caseSensitive ? 'g' : 'gi';
    
    const regex = new RegExp(pattern, flags);
    const matches = text.match(regex);
    
    return matches ? matches.length : 0;
}

// Usage examples
const text = "Hello world hello everyone hello there. Hellos don't count.";

console.log(countWordOccurrences(text, "hello")); 
// Output: 3 (case insensitive, whole words)

console.log(countWordOccurrences(text, "hello", { caseSensitive: true })); 
// Output: 1 (case sensitive)

console.log(countWordOccurrences(text, "hello", { wholeWord: false })); 
// Output: 4 (includes "Hellos")
function countWordOccurrencesReduce(text: string, word: string): number {
    const words = text.toLowerCase().split(/\W+/);
    const target = word.toLowerCase();
    
    return words.reduce((count, currentWord) => {
        return currentWord === target ? count + 1 : count;
    }, 0);
}

// Usage
const text = "Hello world hello everyone hello there";
console.log(countWordOccurrencesReduce(text, "hello")); // Output: 3
function countWordOccurrences(
    text: string, 
    word: string, 
    caseSensitive: boolean = false
): number {
    if (!text || !word) return 0;
    
    const flags = caseSensitive ? 'g' : 'gi';
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedWord}\\b`, flags);
    
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}
