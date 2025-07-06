function firstNonRepeatingCharacter(s: string): string | null {
    const charCount: { [key: string]: number } = {};

    // Count the occurrences of each character
    for (const char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Find the first non-repeating character
    for (const char of s) {
        if (charCount[char] === 1) {
            return char; // Return the first non-repeating character
        }
    }

    return null; // Return null if there is no non-repeating character
}

// Example usage:
const inputString = "swiss";
const result = firstNonRepeatingCharacter(inputString);
console.log(result); // Output: "w"
