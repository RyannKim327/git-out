function countWordOccurrences(text: string, targetWord: string): number {
    const words = text.split(/\s+/); // Split by whitespace
    return words.filter(word => word.toLowerCase() === targetWord.toLowerCase()).length;
}

// Usage
const text = "Hello world hello TypeScript hello";
const count = countWordOccurrences(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesRegex(text: string, targetWord: string): number {
    const regex = new RegExp(`\\b${targetWord}\\b`, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Usage
const text = "Hello world hello TypeScript hello";
const count = countWordOccurrencesRegex(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesRobust(text: string, targetWord: string): number {
    // Remove punctuation and split into words
    const cleanText = text.replace(/[^\w\s]/g, '');
    const words = cleanText.toLowerCase().split(/\s+/);
    const normalizedTarget = targetWord.toLowerCase();
    
    return words.filter(word => word === normalizedTarget).length;
}

// Usage
const text = "Hello, world! Hello TypeScript. Hello?";
const count = countWordOccurrencesRobust(text, "hello");
console.log(count); // Output: 3
function countAllWords(text: string): Record<string, number> {
    const cleanText = text.replace(/[^\w\s]/g, '').toLowerCase();
    const words = cleanText.split(/\s+/).filter(word => word.length > 0);
    
    const frequencyMap: Record<string, number> = {};
    
    words.forEach(word => {
        frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });
    
    return frequencyMap;
}

// Usage
const text = "Hello world hello TypeScript hello";
const frequencyMap = countAllWords(text);
console.log(frequencyMap.hello); // Output: 3
console.log(frequencyMap.world); // Output: 1
function countWordOccurrencesCaseSensitive(text: string, targetWord: string): number {
    const words = text.split(/\s+/);
    return words.filter(word => word === targetWord).length;
}

// Usage
const text = "Hello world hello TypeScript Hello";
const count = countWordOccurrencesCaseSensitive(text, "Hello");
console.log(count); // Output: 2
