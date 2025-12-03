function firstRepeatedChar(str: string): string | null {
    const seen = new Set<string>();

    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    return null; // No repeated character found
}

// Example:
console.log(firstRepeatedChar("abcdefab")); // Output: "a"
console.log(firstRepeatedChar("123456"));   // Output: null
