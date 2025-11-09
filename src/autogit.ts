/**
 * Checks if two strings are anagrams, ignoring case, spaces, and punctuation.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsSorting(s1: string, s2: string): boolean {
    // 1. Preprocess strings:
    //    - Convert to lowercase
    //    - Remove all non-alphanumeric characters (using a regex)
    const cleanS1 = s1.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanS2 = s2.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. If lengths are different after cleaning, they cannot be anagrams
    if (cleanS1.length !== cleanS2.length) {
        return false;
    }

    // 3. Convert to arrays, sort, and join back to a string
    const sortedS1 = cleanS1.split('').sort().join('');
    const sortedS2 = cleanS2.split('').sort().join('');

    // 4. Compare the sorted strings
    return sortedS1 === sortedS2;
}

// --- Usage Examples ---
console.log("--- Sorting Method ---");
console.log(`"Listen", "Silent" -> ${areAnagramsSorting("Listen", "Silent")}`); // true
console.log(`"A gentleman", "Elegant man" -> ${areAnagramsSorting("A gentleman", "Elegant man")}`); // true
console.log(`"Anagram", "Nagaram" -> ${areAnagramsSorting("Anagram", "Nagaram")}`); // true
console.log(`"Debit card", "Bad credit" -> ${areAnagramsSorting("Debit card", "Bad credit")}`); // true
console.log(`"Hello", "World" -> ${areAnagramsSorting("Hello", "World")}`); // false
console.log(`"", "" -> ${areAnagramsSorting("", "")}`); // true (empty strings are anagrams of themselves)
console.log(`"a", "a" -> ${areAnagramsSorting("a", "a")}`); // true
console.log(`"a", "b" -> ${areAnagramsSorting("a", "b")}`); // false
console.log(`"Rail Safety", "Fairy Tales" -> ${areAnagramsSorting("Rail Safety", "Fairy Tales")}`); // true
console.log(`"Dormitory", "Dirty room" -> ${areAnagramsSorting("Dormitory", "Dirty room")}`); // true
console.log(`"The quick brown fox", "Jumps over the lazy dog" -> ${areAnagramsSorting("The quick brown fox", "Jumps over the lazy dog")}`); // false (different characters/lengths)
/**
 * Checks if two strings are anagrams using a frequency counter,
 * ignoring case, spaces, and punctuation.
 *
 * @param s1 The first string.
 * @param s2 The second string.
 * @returns True if the strings are anagrams, false otherwise.
 */
function areAnagramsFrequency(s1: string, s2: string): boolean {
    // 1. Preprocess strings:
    //    - Convert to lowercase
    //    - Remove all non-alphanumeric characters (using a regex)
    const cleanS1 = s1.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanS2 = s2.toLowerCase().replace(/[^a-z0-9]/g, '');

    // 2. If lengths are different after cleaning, they cannot be anagrams
    if (cleanS1.length !== cleanS2.length) {
        return false;
    }

    // Handle empty strings explicitly (or they will pass length check and frequency logic correctly)
    if (cleanS1.length === 0) {
        return true; // Both are empty strings
    }

    // 3. Create a frequency map for the first string
    const charCounts: { [key: string]: number } = {};
    for (const char of cleanS1) {
        charCounts[char] = (charCounts[char] || 0) + 1;
    }

    // 4. Decrement counts based on the second string
    for (const char of cleanS2) {
        // If a character in s2 is not found in the map
        // or its count has already reached zero (or less),
        // then s2 has a character that s1 doesn't have, or not enough of.
        if (!charCounts[char]) {
            return false;
        }
        charCounts[char]--;
    }

    // 5. At this point, all counts in charCounts *must* be zero.
    //    If any count is non-zero, it means s1 had characters
    //    that s2 didn't "use up". However, due to the initial
    //    length check and the decrement logic, if we reach here,
    //    all counts *will* be zero. No explicit final loop is needed.
    return true;
}


// --- Usage Examples ---
console.log("\n--- Frequency Counter Method ---");
console.log(`"Listen", "Silent" -> ${areAnagramsFrequency("Listen", "Silent")}`); // true
console.log(`"A gentleman", "Elegant man" -> ${areAnagramsFrequency("A gentleman", "Elegant man")}`); // true
console.log(`"Anagram", "Nagaram" -> ${areAnagramsFrequency("Anagram", "Nagaram")}`); // true
console.log(`"Debit card", "Bad credit" -> ${areAnagramsFrequency("Debit card", "Bad credit")}`); // true
console.log(`"Hello", "World" -> ${areAnagramsFrequency("Hello", "World")}`); // false
console.log(`"", "" -> ${areAnagramsFrequency("", "")}`); // true
console.log(`"a", "a" -> ${areAnagramsFrequency("a", "a")}`); // true
console.log(`"a", "b" -> ${areAnagramsFrequency("a", "b")}`); // false
console.log(`"Rail Safety", "Fairy Tales" -> ${areAnagramsFrequency("Rail Safety", "Fairy Tales")}`); // true
console.log(`"Dormitory", "Dirty room" -> ${areAnagramsFrequency("Dormitory", "Dirty room")}`); // true
