function areAnagramsSort(str1: string, str2: string): boolean {
    // Helper function to clean and sort a string
    const cleanAndSort = (s: string): string => {
        return s
            .toLowerCase()                   // Convert to lowercase
            .replace(/[^a-z0-9]/g, '')       // Remove non-alphanumeric characters
            .split('')                       // Convert to an array of characters
            .sort()                          // Sort the array alphabetically
            .join('');                       // Join back into a string
    };

    const cleanedStr1 = cleanAndSort(str1);
    const cleanedStr2 = cleanAndSort(str2);

    // If, after cleaning, the lengths are different, they cannot be anagrams
    // This check is technically redundant if we directly compare cleanedStr1 === cleanedStr2,
    // as strings of different lengths can't be strictly equal.
    // However, it can provide a very minor early exit optimization in some cases.
    if (cleanedStr1.length !== cleanedStr2.length) {
        return false;
    }

    // Compare the sorted strings
    return cleanedStr1 === cleanedStr2;
}

// --- Usage Examples ---

console.log("--- Sorting Method ---");
console.log(`"listen", "silent" -> ${areAnagramsSort("listen", "silent")}`);             // true
console.log(`"hello", "world" -> ${areAnagramsSort("hello", "world")}`);             // false
console.log(`"Anagram", "Nag a ram" -> ${areAnagramsSort("Anagram", "Nag a ram")}`); // true (case-insensitive, ignores spaces)
console.log(`"Debit card", "Bad credit" -> ${areAnagramsSort("Debit card", "Bad credit")}`); // true
console.log(`"A gentleman", "Elegant man" -> ${areAnagramsSort("A gentleman", "Elegant man")}`); // true
console.log(`"rail safety", "fairy tales" -> ${areAnagramsSort("rail safety", "fairy tales")}`); // true
console.log(`"", "" -> ${areAnagramsSort("", "")}`);                                // true (empty strings are anagrams of each other)
console.log(`"a", "" -> ${areAnagramsSort("a", "")}`);                                // false
console.log(`"a", "a" -> ${areAnagramsSort("a", "a")}`);                                // true
console.log(`"aa", "a" -> ${areAnagramsSort("aa", "a")}`);                             // false
console.log(`"dormitory", "dirty room" -> ${areAnagramsSort("dormitory", "dirty room")}`); // true
console.log(`"The quick brown fox", "fox brown quick The" -> ${areAnagramsSort("The quick brown fox", "fox brown quick The")}`); // false (different characters after cleaning due to spaces removed)
console.log(`"apple", "aple" -> ${areAnagramsSort("apple", "aple")}`);                 // false
function areAnagramsMap(str1: string, str2: string): boolean {
    // Helper function to clean a string
    const cleanString = (s: string): string => {
        return s
            .toLowerCase()                   // Convert to lowercase
            .replace(/[^a-z0-9]/g, '');      // Remove non-alphanumeric characters
    };

    const cleanedStr1 = cleanString(str1);
    const cleanedStr2 = cleanString(str2);

    // If, after cleaning, the lengths are different, they cannot be anagrams
    if (cleanedStr1.length !== cleanedStr2.length) {
        return false;
    }

    // Helper function to build a character frequency map
    const getCharCounts = (s: string): Map<string, number> => {
        const charCounts = new Map<string, number>();
        for (const char of s) {
            charCounts.set(char, (charCounts.get(char) || 0) + 1);
        }
        return charCounts;
    };

    const charCounts1 = getCharCounts(cleanedStr1);
    const charCounts2 = getCharCounts(cleanedStr2);

    // Compare the two frequency maps
    // First, check if they have the same number of unique characters
    // (This is actually implicitly covered by the loop if lengths are equal,
    // but can be an early exit for some edge cases like "aa" vs "bb")
    // if (charCounts1.size !== charCounts2.size) {
    //     return false;
    // }

    // Then, iterate through one map and check if the other map has the same character with the same count
    for (const [char, count] of charCounts1) {
        if (charCounts2.get(char) !== count) {
            return false; // Character either doesn't exist in str2 or has a different count
        }
    }

    // If all checks pass, they are anagrams
    return true;
}

// --- Usage Examples ---

console.log("\n--- Character Counting Method ---");
console.log(`"listen", "silent" -> ${areAnagramsMap("listen", "silent")}`);             // true
console.log(`"hello", "world" -> ${areAnagramsMap("hello", "world")}`);             // false
console.log(`"Anagram", "Nag a ram" -> ${areAnagramsMap("Anagram", "Nag a ram")}`); // true
console.log(`"Debit card", "Bad credit" -> ${areAnagramsMap("Debit card", "Bad credit")}`); // true
console.log(`"A gentleman", "Elegant man" -> ${areAnagramsMap("A gentleman", "Elegant man")}`); // true
console.log(`"rail safety", "fairy tales" -> ${areAnagramsMap("rail safety", "fairy tales")}`); // true
console.log(`"", "" -> ${areAnagramsMap("", "")}`);                                // true
console.log(`"a", "" -> ${areAnagramsMap("a", "")}`);                                // false
console.log(`"a", "a" -> ${areAnagramsMap("a", "a")}`);                                // true
console.log(`"aa", "a" -> ${areAnagramsMap("aa", "a")}`);                             // false
console.log(`"dormitory", "dirty room" -> ${areAnagramsMap("dormitory", "dirty room")}`); // true
console.log(`"The quick brown fox", "fox brown quick The" -> ${areAnagramsMap("The quick brown fox", "fox brown quick The")}`); // false
console.log(`"apple", "aple" -> ${areAnagramsMap("apple", "aple")}`);                 // false
