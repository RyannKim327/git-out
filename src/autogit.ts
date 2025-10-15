function findFirstRepeatedCharCaseSensitive(str: string): string | null {
    // 1. Handle edge cases: empty or null/undefined string
    if (!str || str.length === 0) {
        return null;
    }

    // 2. Use a Set to store characters we've encountered so far
    const seenChars = new Set<string>();

    // 3. Iterate over each character in the string
    //    Using `for...of` ensures correct handling of Unicode characters and emojis.
    for (const char of str) {
        // 4. Check if the current character is already in our Set
        if (seenChars.has(char)) {
            // If it is, this is the first repeated character
            return char;
        }
        // 5. If not, add the character to the Set
        seenChars.add(char);
    }

    // 6. If the loop completes without finding any repeated character, return null
    return null;
}

// --- Examples ---
console.log("--- Case-Sensitive Examples ---");
console.log("programming:", findFirstRepeatedCharCaseSensitive("programming"));  // Output: r
console.log("abcdefg:", findFirstRepeatedCharCaseSensitive("abcdefg"));      // Output: null
console.log("abccba:", findFirstRepeatedCharCaseSensitive("abccba"));       // Output: c
console.log("racecar:", findFirstRepeatedCharCaseSensitive("racecar"));      // Output: r
console.log("aabbcc:", findFirstRepeatedCharCaseSensitive("aabbcc"));       // Output: a
console.log("TypeScript:", findFirstRepeatedCharCaseSensitive("TypeScript")); // Output: e
console.log("a:", findFirstRepeatedCharCaseSensitive("a"));               // Output: null
console.log("aa:", findFirstRepeatedCharCaseSensitive("aa"));             // Output: a
console.log("", findFirstRepeatedCharCaseSensitive(""));                 // Output: null
console.log("Hello World!", findFirstRepeatedCharCaseSensitive("Hello World!")); // Output: l (the second 'l')
console.log("😎🍎🚀😎", findFirstRepeatedCharCaseSensitive("😎🍎🚀😎")); // Output: 😎
function findFirstRepeatedCharCaseInsensitive(str: string): string | null {
    if (!str || str.length === 0) {
        return null;
    }

    const seenCharsLower = new Set<string>();

    for (const char of str) {
        const lowerChar = char.toLowerCase(); // Convert to lowercase for comparison
        if (seenCharsLower.has(lowerChar)) {
            return char; // Return the character in its original case as it was found
        }
        seenCharsLower.add(lowerChar);
    }

    return null;
}

// --- Examples ---
console.log("\n--- Case-Insensitive Examples ---");
console.log("Programming:", findFirstRepeatedCharCaseInsensitive("Programming")); // Output: r (because P is seen, then r, then o, then g, then r. 'r' is repeated.)
console.log("TypeScript:", findFirstRepeatedCharCaseInsensitive("TypeScript"));  // Output: e
console.log("AaBbCcA:", findFirstRepeatedCharCaseInsensitive("AaBbCcA"));       // Output: A (the second 'A')
console.log("racecar:", findFirstRepeatedCharCaseInsensitive("racecar"));       // Output: r
console.log("RaCeCar:", findFirstRepeatedCharCaseInsensitive("RaCeCar"));       // Output: C (because 'R' is seen, then 'a', then 'C'. 'c' is seen. So 'C' is the first repeated char)
