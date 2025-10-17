function areAnagramsSort(str1: string, str2: string): boolean {
    // Helper function to normalize the string
    const normalize = (s: string): string => {
        return s
            .toLowerCase()                  // Convert to lowercase
            .replace(/[^a-z0-9]/g, '')      // Remove non-alphanumeric characters
            .split('')                      // Split into an array of characters
            .sort()                         // Sort the characters
            .join('');                      // Join them back into a string
    };

    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);

    // If the normalized and sorted strings are identical, they are anagrams
    return normalizedStr1 === normalizedStr2;
}

// --- Examples ---
console.log(`"Listen" and "Silent": ${areAnagramsSort("Listen", "Silent")}`); // true
console.log(`"Hello" and "World": ${areAnagramsSort("Hello", "World")}`);     // false
console.log(`"A gentleman" and "Elegant Man": ${areAnagramsSort("A gentleman", "Elegant Man")}`); // true
console.log(`"Dormitory" and "Dirty Room": ${areAnagramsSort("Dormitory", "Dirty Room")}`);     // true
console.log(`"The quick brown fox" and "Jumps over the lazy dog": ${areAnagramsSort("The quick brown fox", "Jumps over the lazy dog")}`); // false
console.log(`"" and "": ${areAnagramsSort("", "")}`);                       // true (empty strings are anagrams of each other)
console.log(`"a" and "a": ${areAnagramsSort("a", "a")}`);                   // true
console.log(`"ab" and "ba": ${areAnagramsSort("ab", "ba")}`);               // true
console.log(`"Abc" and "bca": ${areAnagramsSort("Abc", "bCa")}`);           // true
function areAnagramsCount(str1: string, str2: string): boolean {
    // Helper function to normalize the string (only lowercase and remove non-alphanumeric)
    const normalize = (s: string): string => {
        return s.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    const nStr1 = normalize(str1);
    const nStr2 = normalize(str2);

    // 1. Quick check: If normalized lengths differ, they can't be anagrams
    if (nStr1.length !== nStr2.length) {
        return false;
    }

    // 2. Handle empty strings (if lengths are equal and 0, they are anagrams)
    if (nStr1.length === 0) {
        return true;
    }

    // 3. Create a frequency map for characters in the first string
    const charCounts = new Map<string, number>();

    for (const char of nStr1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // 4. Iterate through the second string and decrement counts
    for (const char of nStr2) {
        const count = charCounts.get(char);

        // If character not found in map OR its count is already zero, not an anagram
        if (!count) {
            return false;
        }

        charCounts.set(char, count - 1);
    }

    // If we've made it this far, all characters in nStr2 were found and
    // accounted for. Because we already checked that nStr1.length === nStr2.length,
    // all counts in the map must now be zero.
    return true;
}

// --- Examples ---
console.log(`\n--- Character Counting Method ---`);
console.log(`"Listen" and "Silent": ${areAnagramsCount("Listen", "Silent")}`); // true
console.log(`"Hello" and "World": ${areAnagramsCount("Hello", "World")}`);     // false
console.log(`"A gentleman" and "Elegant Man": ${areAnagramsCount("A gentleman", "Elegant Man")}`); // true
console.log(`"Dormitory" and "Dirty Room": ${areAnagramsCount("Dormitory", "Dirty Room")}`);     // true
console.log(`"The quick brown fox" and "Jumps over the lazy dog": ${areAnagramsCount("The quick brown fox", "Jumps over the lazy dog")}`); // false
console.log(`"" and "": ${areAnagramsCount("", "")}`);                       // true
console.log(`"a" and "a": ${areAnagramsCount("a", "a")}`);                   // true
console.log(`"ab" and "ba": ${areAnagramsCount("ab", "ba")}`);               // true
console.log(`"Abc" and "bca": ${areAnagramsCount("Abc", "bCa")}`);           // true
