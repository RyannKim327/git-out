function firstNonRepeatingCharacter(str: string): string | null {
    const charCount: Map<string, number> = new Map();

    // Step 1: Count occurrences of each character
    for (let char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    // Step 2: Find the first non-repeating character
    for (let char of str) {
        if (charCount.get(char) === 1) {
            return char; // Return the first non-repeating character
        }
    }

    return null; // Return null if there is no non-repeating character
}

// Example usage:
const inputString = "swiss";
const result = firstNonRepeatingCharacter(inputString);
console.log(result); // Output: "w"
