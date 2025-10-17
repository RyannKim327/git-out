function normalizeString(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]/g, ''); // Removes non-alphanumeric characters
}
/**
 * Checks if two strings are anagrams by normalizing them and sorting their characters.
 *
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsSorting(str1: string, str2: string): boolean {
    // Step 1: Normalize both strings
    const cleanStr1 = normalizeString(str1);
    const cleanStr2 = normalizeString(str2);

    // Step 2: Check for different lengths (an early exit for non-anagrams)
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }

    // Step 3 & 4: Split, sort, and join
    const sortedStr1 = cleanStr1.split('').sort().join('');
    const sortedStr2 = cleanStr2.split('').sort().join('');

    // Step 5: Compare the sorted strings
    return sortedStr1 === sortedStr2;
}

// --- Example Usage ---
console.log("--- Method 1: Sorting Characters ---");
console.log("'listen' and 'silent':", areAnagramsSorting("listen", "silent")); // true
console.log("'Listen' and 'Silent':", areAnagramsSorting("Listen", "Silent")); // true (due to normalization)
console.log("'Hello' and 'World':", areAnagramsSorting("Hello", "World")); // false
console.log("'A Gentleman' and 'Elegant Man':", areAnagramsSorting("A Gentleman", "Elegant Man")); // true
console.log("'' and '':", areAnagramsSorting("", "")); // true
console.log("'' and 'a':", areAnagramsSorting("", "a")); // false
console.log("'apple' and 'ppale':", areAnagramsSorting("apple", "ppale")); // true
/**
 * Checks if two strings are anagrams by counting character frequencies.
 *
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsFrequencyMap(str1: string, str2: string): boolean {
    // Step 1: Normalize both strings
    const cleanStr1 = normalizeString(str1);
    const cleanStr2 = normalizeString(str2);

    // Step 2: Check for different lengths (early exit)
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }

    // Step 3: Create a frequency map for cleanStr1
    const charMap = new Map<string, number>();
    for (const char of cleanStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }

    // Step 4: Iterate through cleanStr2 and decrement counts
    for (const char of cleanStr2) {
        const count = charMap.get(char);
        if (!count) {
            // Character not found in map (meaning it wasn't in str1)
            // or its count was already zero.
            return false;
        }
        charMap.set(char, count - 1);
    }

    // Step 5: If all characters in str2 were found and their counts decremented
    // successfully, and original lengths were equal, they are anagrams.
    // No need to check if all map values are 0 because of the initial length check.
    return true;
}

// --- Example Usage ---
console.log("\n--- Method 2: Character Frequency Map ---");
console.log("'listen' and 'silent':", areAnagramsFrequencyMap("listen", "silent")); // true
console.log("'Listen' and 'Silent':", areAnagramsFrequencyMap("Listen", "Silent")); // true
console.log("'Hello' and 'World':", areAnagramsFrequencyMap("Hello", "World")); // false
console.log("'A Gentleman' and 'Elegant Man':", areAnagramsFrequencyMap("A Gentleman", "Elegant Man")); // true
console.log("'' and '':", areAnagramsFrequencyMap("", "")); // true
console.log("'' and 'a':", areAnagramsFrequencyMap("", "a")); // false
console.log("'apple' and 'ppale':", areAnagramsFrequencyMap("apple", "ppale")); // true
