function areAnagramsSorting(str1: string, str2: string): boolean {
    // Helper function to normalize and sort a string
    const normalizeAndSort = (str: string): string => {
        // 1. Convert to lowercase to handle case-insensitivity (e.g., "Listen" vs "silent")
        // 2. Remove non-alphanumeric characters (spaces, punctuation)
        //    (e.g., "A gentleman" vs "Elegant man")
        // 3. Split into an array of characters
        // 4. Sort the characters
        // 5. Join them back into a string
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '') // Removes anything not a-z or 0-9
            .split('')
            .sort()
            .join('');
    };

    const sortedStr1 = normalizeAndSort(str1);
    const sortedStr2 = normalizeAndSort(str2);

    // If the normalized and sorted strings are identical, they are anagrams
    return sortedStr1 === sortedStr2;
}

// --- Examples ---
console.log(`"listen" and "silent": ${areAnagramsSorting("listen", "silent")}`); // true
console.log(`"hello" and "world": ${areAnagramsSorting("hello", "world")}`);   // false
console.log(`"Debit card" and "Bad credit": ${areAnagramsSorting("Debit card", "Bad credit")}`); // true
console.log(`"a gentleman" and "elegant man": ${areAnagramsSorting("a gentleman", "elegant man")}`); // true
console.log(`"The quick brown fox" and "jumps over the lazy dog": ${areAnagramsSorting("The quick brown fox", "jumps over the lazy dog")}`); // false
console.log(`"" and "": ${areAnagramsSorting("", "")}`); // true (empty strings are anagrams of each other)
console.log(`"a" and "a": ${areAnagramsSorting("a", "a")}`); // true
console.log(`"a" and "b": ${areAnagramsSorting("a", "b")}`); // false
function areAnagramsCounting(str1: string, str2: string): boolean {
    // Helper function to normalize a string
    const normalize = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    };

    const cleanStr1 = normalize(str1);
    const cleanStr2 = normalize(str2);

    // If lengths are different after cleaning, they cannot be anagrams
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }

    // Handle empty strings explicitly (optional, as the loop below would also work)
    if (cleanStr1.length === 0) {
        return true;
    }

    // Use a Map to store character frequencies
    const charCounts = new Map<string, number>();

    // Count characters in the first string
    for (const char of cleanStr1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // Decrement counts for characters in the second string
    for (const char of cleanStr2) {
        const count = charCounts.get(char);
        if (!count) {
            // Character not found in the first string or its count is already zero
            return false;
        }
        charCounts.set(char, count - 1);
    }

    // If we reach this point, and lengths were equal, all counts must be zero.
    // (There's no need to iterate through charCounts again to check for non-zero counts
    // because if any character count was positive, the corresponding char in cleanStr2
    // wouldn't have been able to fully decrement it, or if it was negative,
    // we would have returned false already).
    return true;
}

// --- Examples ---
console.log(`"listen" and "silent": ${areAnagramsCounting("listen", "silent")}`); // true
console.log(`"hello" and "world": ${areAnagramsCounting("hello", "world")}`);   // false
console.log(`"Debit card" and "Bad credit": ${areAnagramsCounting("Debit card", "Bad credit")}`); // true
console.log(`"a gentleman" and "elegant man": ${areAnagramsCounting("a gentleman", "elegant man")}`); // true
console.log(`"The quick brown fox" and "jumps over the lazy dog": ${areAnagramsCounting("The quick brown fox", "jumps over the lazy dog")}`); // false
console.log(`"" and "": ${areAnagramsCounting("", "")}`); // true
console.log(`"a" and "a": ${areAnagramsCounting("a", "a")}`); // true
console.log(`"a" and "b": ${areAnagramsCounting("a", "b")}`); // false
