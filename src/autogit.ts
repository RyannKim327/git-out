/**
 * Normalizes a string by converting it to lowercase, removing non-alphanumeric characters,
 * and then sorting its characters. This prepares the string for anagram comparison.
 * @param str The input string.
 * @returns The normalized and sorted string.
 */
function normalizeAndSort(str: string): string {
    return str
        .toLowerCase()           // Convert to lowercase
        .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric characters (spaces, punctuation, etc.)
        .split('')               // Convert string to an array of characters
        .sort()                  // Sort the characters alphabetically
        .join('');               // Join the characters back into a string
}
/**
 * Checks if two strings are anagrams by normalizing and sorting their characters.
 * This method is generally concise and readable.
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function isAnagram_SortAndCompare(str1: string, str2: string): boolean {
    const normalized1 = normalizeAndSort(str1);
    const normalized2 = normalizeAndSort(str2);

    // If the normalized and sorted strings are identical, they are anagrams.
    return normalized1 === normalized2;
}

// --- Examples ---
console.log("--- Method 1: Sort and Compare ---");
console.log("'listen' and 'silent':", isAnagram_SortAndCompare('listen', 'silent')); // true
console.log("'hello' and 'world':", isAnagram_SortAndCompare('hello', 'world')); // false
console.log("'Debit card' and 'Bad credit':", isAnagram_SortAndCompare('Debit card', 'Bad credit')); // true (case-insensitive, ignores space)
console.log("'Astronomer' and 'Moon starer':", isAnagram_SortAndCompare('Astronomer', 'Moon starer')); // true
console.log("'A gentleman' and 'Elegant man':", isAnagram_SortAndCompare('A gentleman', 'Elegant man')); // true
console.log("'' and '':", isAnagram_SortAndCompare('', '')); // true
console.log("'' and 'a':", isAnagram_SortAndCompare('', 'a')); // false
console.log("'a' and 'A':", isAnagram_SortAndCompare('a', 'A')); // true
console.log("'aaab' and 'aaba':", isAnagram_SortAndCompare('aaab', 'aaba')); // true
/**
 * Checks if two strings are anagrams by building character frequency maps.
 * This method is generally more performant for very long strings (O(N) vs O(N log N)).
 * @param str1 The first string.
 * @param str2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function isAnagram_FrequencyMap(str1: string, str2: string): boolean {
    // Helper to clean the string (lowercase, remove non-alphanumeric)
    const cleanString = (s: string): string => {
        return s.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    const cleanedStr1 = cleanString(str1);
    const cleanedStr2 = cleanString(str2);

    // If lengths are different after cleaning, they cannot be anagrams
    if (cleanedStr1.length !== cleanedStr2.length) {
        return false;
    }

    // Create a frequency map for the first string
    const charCounts = new Map<string, number>();

    for (const char of cleanedStr1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // Iterate through the second string and decrement counts
    for (const char of cleanedStr2) {
        // If character is not in the map or its count is already 0, it's not an anagram
        if (!charCounts.has(char) || charCounts.get(char)! === 0) {
            return false;
        }
        charCounts.set(char, charCounts.get(char)! - 1);
    }

    // If we've made it this far, all characters matched their counts
    return true;
}

// --- Examples ---
console.log("\n--- Method 2: Character Frequency Map ---");
console.log("'listen' and 'silent':", isAnagram_FrequencyMap('listen', 'silent')); // true
console.log("'hello' and 'world':", isAnagram_FrequencyMap('hello', 'world')); // false
console.log("'Debit card' and 'Bad credit':", isAnagram_FrequencyMap('Debit card', 'Bad credit')); // true
console.log("'Astronomer' and 'Moon starer':", isAnagram_FrequencyMap('Astronomer', 'Moon starer')); // true
console.log("'A gentleman' and 'Elegant man':", isAnagram_FrequencyMap('A gentleman', 'Elegant man')); // true
console.log("'' and '':", isAnagram_FrequencyMap('', '')); // true
console.log("'' and 'a':", isAnagram_FrequencyMap('', 'a')); // false
console.log("'a' and 'A':", isAnagram_FrequencyMap('a', 'A')); // true
console.log("'aaab' and 'aaba':", isAnagram_FrequencyMap('aaab', 'aaba')); // true
