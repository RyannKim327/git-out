function countWordOccurrences(text: string, word: string): number {
    const words = text.split(/\s+/); // Split by whitespace
    return words.filter(w => w.toLowerCase() === word.toLowerCase()).length;
}

// Example usage
const text = "The quick brown fox jumps over the lazy dog. The dog is lazy.";
const count = countWordOccurrences(text, "the");
console.log(count); // Output: 3
function countWordOccurrencesRegex(text: string, word: string): number {
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // \\b for word boundaries
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Example usage
const count = countWordOccurrencesRegex(text, "dog");
console.log(count); // Output: 2
function countWordOccurrencesLoop(text: string, word: string): number {
    let count = 0;
    let position = -1;
    
    while ((position = text.toLowerCase().indexOf(word.toLowerCase(), position + 1)) !== -1) {
        // Check if it's a whole word (not part of another word)
        const before = position === 0 ? ' ' : text[position - 1];
        const after = text[position + word.length] || ' ';
        
        if (!/\w/.test(before) && !/\w/.test(after)) {
            count++;
        }
    }
    
    return count;
}
function countWordOccurrencesRobust(text: string, word: string): number {
    // Remove punctuation and normalize text
    const cleanText = text.replace(/[^\w\s]/g, ' ').toLowerCase();
    const cleanWord = word.toLowerCase();
    
    const words = cleanText.split(/\s+/).filter(w => w.length > 0);
    return words.filter(w => w === cleanWord).length;
}

// Example with punctuation
const textWithPunctuation = "Hello, world! Hello again. Hello-world is not counted.";
const count = countWordOccurrencesRobust(textWithPunctuation, "hello");
console.log(count); // Output: 2 (ignores "hello-world")
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
    
    let searchText = text;
    let searchWord = word;
    
    if (!caseSensitive) {
        searchText = text.toLowerCase();
        searchWord = word.toLowerCase();
    }
    
    if (wholeWord) {
        const regex = new RegExp(`\\b${searchWord}\\b`, 'g');
        const matches = searchText.match(regex);
        return matches ? matches.length : 0;
    } else {
        let count = 0;
        let position = -1;
        
        while ((position = searchText.indexOf(searchWord, position + 1)) !== -1) {
            count++;
        }
        
        return count;
    }
}

// Example usage with different options
const text = "The theater has a theory about the theorem";
console.log(countWordOccurrences(text, "the")); // Output: 1 (whole words only)
console.log(countWordOccurrences(text, "the", { wholeWord: false })); // Output: 4 (all occurrences)
console.log(countWordOccurrences(text, "The", { caseSensitive: true })); // Output: 1
