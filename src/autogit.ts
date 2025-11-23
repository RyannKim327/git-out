function findFirstRepeatedChar(str: string): string | undefined {
    // A Set to store characters we've encountered so far.
    // Set operations (add, has) are very efficient (average O(1) time complexity).
    const seenChars = new Set<string>();

    for (const char of str) {
        // If the character is already in our set, it means we've seen it before.
        // Since we're iterating from left to right, this is the first repeated character.
        if (seenChars.has(char)) {
            return char;
        }
        // If the character is not in our set, add it for future checks.
        seenChars.add(char);
    }

    // If the loop completes, it means no character was repeated.
    return undefined;
}

// --- Examples ---
console.log(`"hello": ${findFirstRepeatedChar("hello")}`);            // Expected: "l"
console.log(`"programming": ${findFirstRepeatedChar("programming")}`); // Expected: "r"
console.log(`"abcdefg": ${findFirstRepeatedChar("abcdefg")}`);        // Expected: undefined
console.log(`"banana": ${findFirstRepeatedChar("banana")}`);          // Expected: "a"
console.log(`"": ${findFirstRepeatedChar("")}`);                      // Expected: undefined
console.log(`"a": ${findFirstRepeatedChar("a")}`);                    // Expected: undefined
console.log(`"abacaba": ${findFirstRepeatedChar("abacaba")}`);        // Expected: "a" (first repeat encountered is 'a' at index 2)
console.log(`"Hello World": ${findFirstRepeatedChar("Hello World")}`); // Expected: "l" (case-sensitive)
console.log(`"TypeScript": ${findFirstRepeatedChar("TypeScript")}`); // Expected: "t" (case-sensitive)
function findFirstRepeatedCharCaseInsensitive(str: string): string | undefined {
    const seenChars = new Set<string>();

    for (const char of str) {
        const lowerChar = char.toLowerCase(); // Convert to lowercase for comparison
        if (seenChars.has(lowerChar)) {
            return char; // Return the *original* character
        }
        seenChars.add(lowerChar);
    }
    return undefined;
}

console.log(`\n--- Case-Insensitive Examples ---`);
console.log(`"Hello World": ${findFirstRepeatedCharCaseInsensitive("Hello World")}`); // Expected: "l" or "L" depending on strictness. Here it would be "l" (first instance of 'l' or 'L' repeating)
console.log(`"TypeScript": ${findFirstRepeatedCharCaseInsensitive("TypeScript")}`); // Expected: "t" or "T". Here it would be "T" if 'T' is considered a repeat of 't'.
console.log(`"Mississippi": ${findFirstRepeatedCharCaseInsensitive("Mississippi")}`); // Expected: "i"
