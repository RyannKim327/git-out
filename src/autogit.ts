function countWordOccurrences(text: string, word: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const target = word.toLowerCase();
    
    return words.filter(w => w === target).length;
}

// Example usage
const text = "Hello world hello there hello everyone";
const count = countWordOccurrences(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesRegex(text: string, word: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    
    return matches ? matches.length : 0;
}

// Example usage
const text = "Hello world hello there hello everyone";
const count = countWordOccurrencesRegex(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesExact(text: string, word: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = text.match(regex);
    
    return matches ? matches.length : 0;
}
function countWordOccurrencesReduce(text: string, word: string): number {
    const words = text.toLowerCase().split(/\s+/);
    const target = word.toLowerCase();
    
    return words.reduce((count, currentWord) => {
        return currentWord === target ? count + 1 : count;
    }, 0);
}
interface WordCountResult {
    word: string;
    count: number;
}

function analyzeText(text: string, targetWords: string[]): WordCountResult[] {
    const words = text.toLowerCase().split(/\s+/);
    
    return targetWords.map(targetWord => {
        const target = targetWord.toLowerCase();
        const count = words.filter(w => w === target).length;
        
        return {
            word: targetWord,
            count: count
        };
    });
}

// Example usage
const text = "The quick brown fox jumps over the lazy dog";
const results = analyzeText(text, ["the", "fox", "dog", "cat"]);
console.log(results);
// Output: [{ word: "the", count: 2 }, { word: "fox", count: 1 }, ...]
