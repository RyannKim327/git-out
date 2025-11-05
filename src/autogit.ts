function areAnagramsSort(s1: string, s2: string): boolean {
    // Helper to clean and sort a string
    const cleanAndSort = (str: string): string => {
        return str
            .toLowerCase()                 // Convert to lowercase
            .replace(/[^a-z0-9]/g, '')     // Remove non-alphanumeric characters
            .split('')                     // Convert string to an array of characters
            .sort()                        // Sort the array alphabetically
            .join('');                     // Join the array back into a string
    };

    const cleanedS1 = cleanAndSort(s1);
    const cleanedS2 = cleanAndSort(s2);

    // After cleaning, their lengths *must* be the same for them to be anagrams.
    // This is an important early exit.
    if (cleanedS1.length !== cleanedS2.length) {
        return false;
    }

    // Compare the sorted strings
    return cleanedS1 === cleanedS2;
}

// --- Examples ---
console.log("--- Method 1: Sort and Compare ---");
console.log("'listen' and 'silent':", areAnagramsSort('listen', 'silent')); // true
console.log("'Hello' and 'olleh':", areAnagramsSort('Hello', 'olleh'));   // true (case-insensitive)
console.log("'Anagram' and 'Nag a ram':", areAnagramsSort('Anagram', 'Nag a ram')); // true (ignores spaces and case)
console.log("'Dormitory' and 'Dirty room':", areAnagramsSort('Dormitory', 'Dirty room')); // true (ignores spaces and case)
console.log("'listen' and 'silentt':", areAnagramsSort('listen', 'silentt')); // false (different lengths after cleaning)
console.log("'apple' and 'aple':", areAnagramsSort('apple', 'aple'));       // false
console.log("'hello' and 'world':", areAnagramsSort('hello', 'world'));     // false
console.log("'' and '':", areAnagramsSort('', ''));                         // true
console.log("'.' and '':", areAnagramsSort('.', ''));                       // true (both become empty after cleaning)
console.log("'a' and 'A':", areAnagramsSort('a', 'A'));                     // true
function areAnagramsCount(s1: string, s2: string): boolean {
    // Helper to clean a string (lowercase, remove non-alphanumeric)
    const cleanString = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    };

    const cleanedS1 = cleanString(s1);
    const cleanedS2 = cleanString(s2);

    // Early exit if lengths are different after cleaning
    if (cleanedS1.length !== cleanedS2.length) {
        return false;
    }

    // Use an object as a frequency map (hash map)
    const charCounts: { [key: string]: number } = {};

    // 1. Populate charCounts for the first string
    for (const char of cleanedS1) {
        charCounts[char] = (charCounts[char] || 0) + 1;
    }

    // 2. Decrement counts for the second string
    for (const char of cleanedS2) {
        if (!charCounts[char]) {
            // Character not found in s1, or its count is already zero
            return false;
        }
        charCounts[char]--;
    }

    // If we reach here, it means every character in cleanedS2 was present in cleanedS1
    // and matched its frequency. Because the lengths were equal, all counts in charCounts
    // must now be zero. Therefore, no need for an additional loop to check this.
    return true;
}

// --- Examples ---
console.log("\n--- Method 2: Character Count ---");
console.log("'listen' and 'silent':", areAnagramsCount('listen', 'silent')); // true
console.log("'Hello' and 'olleh':", areAnagramsCount('Hello', 'olleh'));   // true
console.log("'Anagram' and 'Nag a ram':", areAnagramsCount('Anagram', 'Nag a ram')); // true
console.log("'Dormitory' and 'Dirty room':", areAnagramsCount('Dormitory', 'Dirty room')); // true
console.log("'listen' and 'silentt':", areAnagramsCount('listen', 'silentt')); // false
console.log("'apple' and 'aple':", areAnagramsCount('apple', 'aple'));       // false
console.log("'hello' and 'world':", areAnagramsCount('hello', 'world'));     // false
console.log("'' and '':", areAnagramsCount('', ''));                         // true
console.log("'.' and '':", areAnagramsCount('.', ''));                       // true
console.log("'a' and 'A':", areAnagramsCount('a', 'A'));                     // true
