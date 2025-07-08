function findFirstRepeatedCharacter(str: string): string | null {
    const seenCharacters = new Set<string>();

    for (const char of str) {
        // Check if the character has been seen before
        if (seenCharacters.has(char)) {
            return char; // Return the first repeated character
        }
        // Add the character to the set
        seenCharacters.add(char);
    }

    return null; // No repeated character found
}

// Example usage:
const input = "programming";
const result = findFirstRepeatedCharacter(input);
console.log(result); // Output: "r"
