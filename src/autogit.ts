/**
 * Normalizes a string by converting it to lowercase and removing all
 * non-alphanumeric characters (spaces, punctuation, symbols).
 * @param str The input string to normalize.
 * @returns The normalized string.
 */
function normalizeString(str: string): string {
    // Convert to lowercase and remove non-alphanumeric characters
    // The regular expression `[^a-z0-9]` matches any character that is NOT a-z or 0-9.
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Checks if two strings are anagrams of each other.
 * Anagrams are words or phrases formed by rearranging the letters of another,
 * typically using all the original letters exactly once.
 * This function is case-insensitive and ignores non-alphanumeric characters.
 *
 * @param str1 The first string to compare.
 * @param str2 The second string to compare.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsSort(str1: string, str2: string): boolean {
    const normalized1 = normalizeString(str1);
    const normalized2 = normalizeString(str2);

    // If, after normalization, the lengths are different, they cannot be anagrams
    if (normalized1.length !== normalized2.length) {
        return false;
    }

    // Sort the characters of both normalized strings and compare them
    const sorted1 = normalized1.split('').sort().join('');
    const sorted2 = normalized2.split('').sort().join('');

    return sorted1 === sorted2;
}

// --- Examples ---
console.log("--- Method 1: Sorting Characters ---");
console.log(`"listen" and "silent": ${areAnagramsSort("listen", "silent")}`); // true
console.log(`"Debit card" and "Bad credit": ${areAnagramsSort("Debit card", "Bad credit")}`); // true (ignores spaces, case-insensitive)
console.log(`"Anagram" and "Nag a ram": ${areAnagramsSort("Anagram", "Nag a ram")}`); // true
console.log(`"hello" and "world": ${areAnagramsSort("hello", "world")}`); // false
console.log(`"A gentleman" and "Elegant man": ${areAnagramsSort("A gentleman", "Elegant man")}`); // true
console.log(`"test!" and "tset.": ${areAnagramsSort("test!", "tset.")}`); // true (ignores punctuation)
console.log(`"abc" and "ab": ${areAnagramsSort("abc", "ab")}`); // false (different lengths after normalization)
console.log(`"" and "": ${areAnagramsSort("", "")}`); // true (empty strings are anagrams of each other)
console.log(`"123" and "321": ${areAnagramsSort("123", "321")}`); // true (includes numbers by default)
/**
 * Builds a character frequency map for a given string.
 * It normalizes the string first by converting it to lowercase and
 * removing non-alphanumeric characters.
 *
 * @param str The input string.
 * @returns A Map where keys are characters and values are their counts.
 */
function buildCharFrequencyMap(str: string): Map<string, number> {
    const charCounts = new Map<string, number>();
    const normalizedStr = normalizeString(str); // Reusing the normalizeString from Method 1

    for (const char of normalizedStr) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }
    return charCounts;
}

/**
 * Checks if two strings are anagrams of each other using character frequency maps.
 * This function is case-insensitive and ignores non-alphanumeric characters.
 *
 * @param str1 The first string to compare.
 * @param str2 The second string to compare.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsMap(str1: string, str2: string): boolean {
    const normalized1 = normalizeString(str1);
    const normalized2 = normalizeString(str2);

    // Early exit: If lengths differ after normalization, they can't be anagrams.
    if (normalized1.length !== normalized2.length) {
        return false;
    }

    const map1 = buildCharFrequencyMap(normalized1);
    const map2 = buildCharFrequencyMap(normalized2);

    // If the number of unique characters is different, they cannot be anagrams
    if (map1.size !== map2.size) {
        return false;
    }

    // Compare the counts in the maps
    for (const [char, count] of map1) {
        if (map2.get(char) !== count) {
            return false; // Character not found in map2 or counts don't match
        }
    }

    return true; // All characters and their counts match
}

// --- Examples ---
console.log("\n--- Method 2: Character Frequency Map ---");
console.log(`"listen" and "silent": ${areAnagramsMap("listen", "silent")}`); // true
console.log(`"Debit card" and "Bad credit": ${areAnagramsMap("Debit card", "Bad credit")}`); // true
console.log(`"hello" and "world": ${areAnagramsMap("hello", "world")}`); // false
console.log(`"A gentleman" and "Elegant man": ${areAnagramsMap("A gentleman", "Elegant man")}`); // true
console.log(`"test!" and "tset.": ${areAnagramsMap("test!", "tset.")}`); // true
console.log(`"abc" and "ab": ${areAnagramsMap("abc", "ab")}`); // false
console.log(`"" and "": ${areAnagramsMap("", "")}`); // true
console.log(`"123" and "321": ${areAnagramsMap("123", "321")}`); // true
