function firstNonRepeatingChar(str: string): string | null {
    const charCount = new Map<string, number>();
    
    // First pass: Count occurrences of each character
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Second pass: Find the first character with count 1
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    // No non-repeating character found
    return null;
}
console.log(firstNonRepeatingChar("stress"));    // Output: "t"
console.log(firstNonRepeatingChar("aabbcc"));    // Output: null
console.log(firstNonRepeatingChar("leetcode"));  // Output: "l"
