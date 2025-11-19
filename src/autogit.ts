function countWordOccurrences(text: string, word: string, caseSensitive: boolean = false): number {
    if (!text || !word) return 0;

    // Escape special regex characters in the word
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create regex pattern with word boundaries and flags
    const flags = caseSensitive ? 'g' : 'gi';
    const pattern = new RegExp(`\\b${escapedWord}\\b`, flags);
    
    // Find matches and count occurrences
    const matches = text.match(pattern);
    return matches ? matches.length : 0;
}

// Example usage:
const text = "Hello world, hello universe. HELLO is everywhere! Shello?";
console.log(countWordOccurrences(text, "hello"));          // 3 (case-insensitive)
console.log(countWordOccurrences(text, "hello", true));    // 1 (case-sensitive)
console.log(countWordOccurrences(text, "world"));          // 1
function simpleWordCount(text: string, word: string): number {
    return text.split(/\s+/).filter(w => w === word).length;
}
// Note: Doesn't handle punctuation, case differences, or sub-word matches
