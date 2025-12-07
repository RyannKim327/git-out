function firstNonRepeatingChar(str: string): string | null {
    const charCount: Record<string, number> = {};

    // Count occurrences
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Find first with count 1
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }

    return null; // If no unique character found
}

// Example usage
console.log(firstNonRepeatingChar("swiss")); // Output: 'w'
function firstNonRepeatingChar(str: string): string | null {
    return str.split('').find(char => str.indexOf(char) === str.lastIndexOf(char)) || null;
}
