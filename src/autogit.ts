function countWordOccurrences(text: string, word: string): number {
    const words = text.split(/\s+/); // Split by whitespace
    return words.filter(w => w.toLowerCase() === word.toLowerCase()).length;
}

// Usage
const text = "Hello world hello typescript hello";
const count = countWordOccurrences(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesRegex(text: string, word: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Case-insensitive, word boundaries
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Usage
const text = "Hello world, hello! Hello-typescript hello";
const count = countWordOccurrencesRegex(text, "hello");
console.log(count); // Output: 3 (ignores "Hello-typescript" due to word boundary)
function countWordOccurrencesCaseSensitive(text: string, word: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}
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
    
    const flags = caseSensitive ? 'g' : 'gi';
    const pattern = wholeWord ? `\\b${word}\\b` : word;
    
    const regex = new RegExp(pattern, flags);
    const matches = text.match(regex);
    
    return matches ? matches.length : 0;
}

// Usage examples
const text = "Hello world hello. Hello-typescript hello";

// Case insensitive, whole words only
console.log(countWordOccurrences(text, "hello")); // 3

// Case sensitive
console.log(countWordOccurrences(text, "hello", { caseSensitive: true })); // 2

// Without word boundaries (matches partial words)
console.log(countWordOccurrences(text, "hello", { wholeWord: false })); // 4
function countMultipleWords(text: string, words: string[]): Record<string, number> {
    const wordCounts: Record<string, number> = {};
    const allWords = text.toLowerCase().split(/\s+/);
    
    words.forEach(word => {
        const target = word.toLowerCase();
        wordCounts[word] = allWords.filter(w => w === target).length;
    });
    
    return wordCounts;
}

// Usage
const text = "Hello world hello typescript hello world";
const counts = countMultipleWords(text, ["hello", "world", "typescript"]);
console.log(counts); // { hello: 3, world: 2, typescript: 1 }
