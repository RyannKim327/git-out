/**
 * Cleans a string by converting it to lowercase and removing non-alphanumeric characters.
 * @param str The input string.
 * @returns The cleaned string.
 */
function cleanString(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}
/**
 * Checks if two strings are anagrams using the sorting method.
 * Ignores case and non-alphanumeric characters by default.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsSort(s1: string, s2: string): boolean {
    const cleanedS1 = cleanString(s1);
    const cleanedS2 = cleanString(s2);

    // If lengths are different after cleaning, they cannot be anagrams
    if (cleanedS1.length !== cleanedS2.length) {
        return false;
    }

    const sortedS1 = cleanedS1.split('').sort().join('');
    const sortedS2 = cleanedS2.split('').sort().join('');

    return sortedS1 === sortedS2;
}

// --- Examples ---
console.log("--- Method 1: Sorting Characters ---");
console.log("Listen / Silent:", areAnagramsSort("Listen", "Silent")); // true
console.log("Debit card / Bad credit:", areAnagramsSort("Debit card", "Bad credit")); // true
console.log("Hello / World:", areAnagramsSort("Hello", "World")); // false
console.log("Anagram / Nagaram:", areAnagramsSort("Anagram", "Nagaram")); // true
console.log("Hello / Hlleo:", areAnagramsSort("Hello", "Hlleo")); // true (same chars, different order)
console.log("A / a:", areAnagramsSort("A", "a")); // true (case-insensitive)
console.log(" / :", areAnagramsSort("", "")); // true (empty strings are anagrams of each other)
console.log("abc / ab:", areAnagramsSort("abc", "ab")); // false (different lengths)
/**
 * Checks if two strings are anagrams using the character frequency map method.
 * Ignores case and non-alphanumeric characters by default.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsMap(s1: string, s2: string): boolean {
    const cleanedS1 = cleanString(s1);
    const cleanedS2 = cleanString(s2);

    if (cleanedS1.length !== cleanedS2.length) {
        return false;
    }

    const charCounts = new Map<string, number>();

    // Count characters in the first string
    for (const char of cleanedS1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // Decrement counts based on the second string
    for (const char of cleanedS2) {
        const count = charCounts.get(char);
        if (!count) {
            // Character not found or count already 0
            return false;
        }
        charCounts.set(char, count - 1);
    }

    // If all characters from s2 were successfully decremented,
    // and lengths were equal, all counts in the map must now be 0.
    // No need for a final loop to check if all counts are zero,
    // as the length check and decrement logic cover this.
    return true;
}

// --- Examples ---
console.log("\n--- Method 2: Character Count Map ---");
console.log("Listen / Silent:", areAnagramsMap("Listen", "Silent")); // true
console.log("Debit card / Bad credit:", areAnagramsMap("Debit card", "Bad credit")); // true
console.log("Hello / World:", areAnagramsMap("Hello", "World")); // false
console.log("Anagram / Nagaram:", areAnagramsMap("Anagram", "Nagaram")); // true
console.log("Hello / Hlleo:", areAnagramsMap("Hello", "Hlleo")); // true
console.log("A / a:", areAnagramsMap("A", "a")); // true
console.log(" / :", areAnagramsMap("", "")); // true
console.log("abc / ab:", areAnagramsMap("abc", "ab")); // false
interface AnagramOptions {
    ignoreCase?: boolean;
    ignoreWhitespace?: boolean;
    ignorePunctuation?: boolean;
}

/**
 * Checks if two strings are anagrams with configurable options.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @param options Configuration for checking anagrams.
 *                - `ignoreCase`: (default: true) If true, treats 'A' and 'a' as the same.
 *                - `ignoreWhitespace`: (default: true) If true, removes all whitespace characters.
 *                - `ignorePunctuation`: (default: true) If true, removes all punctuation/symbols.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsConfigurable(s1: string, s2: string, options?: AnagramOptions): boolean {
    const defaultOptions: Required<AnagramOptions> = {
        ignoreCase: true,
        ignoreWhitespace: true,
        ignorePunctuation: true,
    };
    const finalOptions = { ...defaultOptions, ...options };

    const processString = (str: string): string => {
        let processed = str;

        if (finalOptions.ignoreCase) {
            processed = processed.toLowerCase();
        }
        if (finalOptions.ignoreWhitespace) {
            processed = processed.replace(/\s/g, ''); // Remove all whitespace
        }
        if (finalOptions.ignorePunctuation) {
            // Remove any characters that are not letters, numbers, or whitespace (if not ignored)
            // This regex needs careful construction based on what "punctuation" means.
            // A simple approach is to keep only letters and numbers.
            // If whitespace is NOT ignored, we'd adjust this.
            // For simplicity, let's keep it to alphanumeric if punctuation is ignored.
            if (finalOptions.ignoreWhitespace) {
                processed = processed.replace(/[^a-z0-9]/g, '');
            } else {
                // If whitespace is kept, only remove non-alphanumeric that aren't whitespace
                processed = processed.replace(/[^\sa-z0-9]/g, '');
            }
        }
        return processed;
    };

    const processedS1 = processString(s1);
    const processedS2 = processString(s2);

    if (processedS1.length !== processedS2.length) {
        return false;
    }

    const charCounts = new Map<string, number>();

    for (const char of processedS1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    for (const char of processedS2) {
        const count = charCounts.get(char);
        if (!count) {
            return false;
        }
        charCounts.set(char, count - 1);
    }

    return true;
}

// --- Examples ---
console.log("\n--- Method 3: Configurable Anagram Checker ---");

// Default behavior (ignore case, whitespace, punctuation)
console.log("Default - Listen / Silent:", areAnagramsConfigurable("Listen", "Silent")); // true
console.log("Default - Debit card / Bad credit:", areAnagramsConfigurable("Debit card", "Bad credit")); // true

// Case-sensitive
console.log("Case-sensitive - Listen / Silent:", areAnagramsConfigurable("Listen", "Silent", { ignoreCase: false })); // false
console.log("Case-sensitive - A / a:", areAnagramsConfigurable("A", "a", { ignoreCase: false })); // false
console.log("Case-sensitive - A / A:", areAnagramsConfigurable("A", "A", { ignoreCase: false })); // true

// Whitespace-sensitive (but case-insensitive and punctuation ignored by default)
console.log("Whitespace-sensitive - Debit card / Bad credit:",
    areAnagramsConfigurable("Debit card", "Bad credit", { ignoreWhitespace: false })); // false (spaces matter now)
console.log("Whitespace-sensitive - abc / bca:",
    areAnagramsConfigurable("abc ", " bca", { ignoreWhitespace: false })); // false

// Punctuation-sensitive
console.log("Punctuation-sensitive - a.bc / abc.:",
    areAnagramsConfigurable("a.bc", "abc.", { ignorePunctuation: false })); // false
console.log("Punctuation-sensitive - a.bc / .abc:",
    areAnagramsConfigurable("a.bc", ".abc", { ignorePunctuation: false })); // true (if the punctuation is the same)
