function firstRepeatedCharacter(str: string): string | null {
    const seenCharacters = new Set<string>();

    for (const char of str) {
        if (seenCharacters.has(char)) {
            return char; // Return the first repeated character
        }
        seenCharacters.add(char); // Add the character to the set
    }

    return null; // Return null if no repeated character is found
}

// Example usage:
const inputString = "abca";
const result = firstRepeatedCharacter(inputString);
console.log(result); // Output: 'a'
