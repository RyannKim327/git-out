function countWordOccurrences(input: string, word: string, caseSensitive: boolean = false): number {
    if (!word) return 0; // Handle empty word case
    
    // Escape special regex characters in the word (e.g., ".", "*", "?")
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Create regex with word boundaries and case sensitivity flag
    const flags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`\\b${escapedWord}\\b`, flags);
    
    // Find matches and return count
    const matches = input.match(regex);
    return matches ? matches.length : 0;
}
const text = "The quick brown Fox jumps over the lazy fox. Fox!";
console.log(countWordOccurrences(text, "Fox"));         // 3 (case-insensitive match)
console.log(countWordOccurrences(text, "Fox", true));   // 2 (case-sensitive match)
console.log(countWordOccurrences(text, "foxes"));       // 0 (exact word match only)
function simpleCount(input: string, word: string): number {
    const words = input.split(/\s+/);
    return words.filter(w => w.toLowerCase() === word.toLowerCase()).length;
}
