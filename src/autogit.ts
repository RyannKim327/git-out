/**
 * Boyer-Moore-Horspool string searching algorithm implementation
 * @param text The text to search within
 * @param pattern The pattern to search for
 * @returns Index of the first occurrence of pattern in text, or -1 if not found
 */
function boyerMooreHorspool(text: string, pattern: string): number {
    // Edge case handling
    if (pattern.length === 0) return 0; // Empty pattern matches at index 0
    if (text.length < pattern.length) return -1; // Pattern can't fit in text

    const patternLength = pattern.length;
    const lastCharIndex = patternLength - 1;
    
    // Preprocess the bad character table
    const badCharTable: Record<string, number> = {};
    
    // Create shift table based on pattern (all chars except last)
    for (let i = 0; i < lastCharIndex; i++) {
        // Store max shift distance for each character
        badCharTable[pattern[i]] = lastCharIndex - i;
    }

    let currentIndex = 0;
    const maxIndex = text.length - patternLength;

    while (currentIndex <= maxIndex) {
        // Check pattern from right to left
        let patternIndex = lastCharIndex;
        
        // Continue while characters match from end to beginning
        while (patternIndex >= 0 && pattern[patternIndex] === text[currentIndex + patternIndex]) {
            patternIndex--;
        }

        // Full match found
        if (patternIndex < 0) {
            return currentIndex;
        }

        // Get shift distance using the character aligned with the pattern's last character
        const currentChar = text[currentIndex + lastCharIndex];
        const shift = badCharTable[currentChar] ?? patternLength;
        
        currentIndex += shift;
    }

    return -1; // Pattern not found
}
const text = "this is an example text";
const pattern = "example";

const result = boyerMooreHorspool(text, pattern);
console.log(result); // Output: 11 (index where pattern starts)
