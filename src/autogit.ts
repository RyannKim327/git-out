function findFirstRepeatedCharacter(inputString: string): string | null {
    // A Set to store characters we've encountered so far
    const seenChars = new Set<string>();

    // Iterate through each character of the string
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        // If the character is already in our Set, it means we've seen it before,
        // so this is the first repeated character.
        if (seenChars.has(char)) {
            return char; // Return the repeated character
        }

        // If the character is not in our Set, add it so we can track it.
        seenChars.add(char);
    }

    // If the loop finishes, it means no character was repeated.
    return null; // Or you could return an empty string, or throw an error, etc.
}

// --- Examples ---
console.log(`"abracadabra": ${findFirstRepeatedCharacter("abracadabra")}`); // Output: "a"
console.log(`"hello": ${findFirstRepeatedCharacter("hello")}`);           // Output: "l"
console.log(`"typescript": ${findFirstRepeatedCharacter("typescript")}`); // Output: "t"
console.log(`"apple": ${findFirstRepeatedCharacter("apple")}`);           // Output: "p"
console.log(`"javascript": ${findFirstRepeatedCharacter("javascript")}`); // Output: "a"
console.log(`"unique": ${findFirstRepeatedCharacter("unique")}`);         // Output: null
console.log(`"": ${findFirstRepeatedCharacter("")}`);                     // Output: null
console.log(`"Aba": ${findFirstRepeatedCharacter("Aba")}`);               // Output: "a" (case-sensitive)
console.log(`"Racecar": ${findFirstRepeatedCharacter("Racecar")}`);       // Output: "a" (case-sensitive)
function findFirstRepeatedCharacterCaseInsensitive(inputString: string): string | null {
    const seenChars = new Set<string>();

    for (let i = 0; i < inputString.length; i++) {
        const originalChar = inputString[i];
        const lowerChar = originalChar.toLowerCase(); // Convert to lowercase

        if (seenChars.has(lowerChar)) {
            // Note: This returns the character *as it appears* in the string,
            // not its lowercase version. If you want the lowercase version, return `lowerChar`.
            return originalChar; 
        }

        seenChars.add(lowerChar);
    }
    return null;
}

console.log(`"Racecar" (case-insensitive): ${findFirstRepeatedCharacterCaseInsensitive("Racecar")}`); // Output: "e" (because 'e' is seen, then 'c' then 'a' then 'r' then 'c' again)
console.log(`"Aba" (case-insensitive): ${findFirstRepeatedCharacterCaseInsensitive("Aba")}`);       // Output: "a" (because 'A' is seen, then 'b', then 'a' (lowercase 'a') is repeated)
