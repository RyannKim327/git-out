function firstNonRepeatingCharacter(str: string): string | null {
    // Create a map to store character counts
    const charCount: { [key: string]: number } = {};

    // Count the frequency of each character
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Find the first character with a count of 1
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }

    // If no non-repeating character found
    return null;
}

// Example usage:
const input = "swiss";
const result = firstNonRepeatingCharacter(input);
console.log(result); // Output: 'w'
