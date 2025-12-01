function areAnagramsSort(s1: string, s2: string): boolean {
    // 1. Normalize strings: convert to lowercase and remove non-alphanumeric characters
    const normalizeString = (str: string): string => {
        return str
            .toLowerCase()           // Convert to lowercase
            .replace(/[^a-z0-9]/g, ''); // Remove spaces, punctuation, etc.
    };

    const cleanS1 = normalizeString(s1);
    const cleanS2 = normalizeString(s2);

    // 2. Check length: if lengths differ after normalization, they can't be anagrams
    if (cleanS1.length !== cleanS2.length) {
        return false;
    }

    // 3. & 4. Split into arrays, sort
    const sortedS1 = cleanS1.split('').sort().join('');
    const sortedS2 = cleanS2.split('').sort().join('');

    // 5. & 6. Compare the sorted strings
    return sortedS1 === sortedS2;
}

// --- Examples ---
console.log("--- Method 1: Sorting Characters ---");
console.log(`"listen", "silent": ${areAnagramsSort("listen", "silent")}`); // true
console.log(`"anagram", "margana": ${areAnagramsSort("anagram", "margana")}`); // true
console.log(`"hello", "world": ${areAnagramsSort("hello", "world")}`); // false
console.log(`"Hello", "olleh": ${areAnagramsSort("Hello", "olleh")}`); // true (case-insensitive)
console.log(`"Clint Eastwood", "Old West Action": ${areAnagramsSort("Clint Eastwood", "Old West Action")}`); // true (ignores spaces/punctuation)
console.log(`"", "": ${areAnagramsSort("", "")}`); // true
console.log(`"a", "a": ${areAnagramsSort("a", "a")}`); // true
console.log(`"a", "b": ${areAnagramsSort("a", "b")}`); // false
console.log(`"aa", "a": ${areAnagramsSort("aa", "a")}`); // false
function areAnagramsMap(s1: string, s2: string): boolean {
    // 1. Normalize strings
    const normalizeString = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    };

    const cleanS1 = normalizeString(s1);
    const cleanS2 = normalizeString(s2);

    // 2. Check length
    if (cleanS1.length !== cleanS2.length) {
        return false;
    }

    // 3. Create frequency map for cleanS1
    const charCounts = new Map<string, number>();
    for (const char of cleanS1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // 4. Iterate through cleanS2 and adjust counts
    for (const char of cleanS2) {
        const count = charCounts.get(char);
        if (count === undefined || count === 0) {
            // Character not found or its count is already 0 (means s2 has more of this char than s1)
            return false;
        }
        charCounts.set(char, count - 1);
    }

    // 5. If we reach here, all characters in cleanS2 were found in cleanS1 with matching frequencies.
    // (Because we already checked lengths and decremented counts)
    return true;
}

// --- Examples ---
console.log("\n--- Method 2: Character Counting (Frequency Map) ---");
console.log(`"listen", "silent": ${areAnagramsMap("listen", "silent")}`); // true
console.log(`"anagram", "margana": ${areAnagramsMap("anagram", "margana")}`); // true
console.log(`"hello", "world": ${areAnagramsMap("hello", "world")}`); // false
console.log(`"Hello", "olleh": ${areAnagramsMap("Hello", "olleh")}`); // true (case-insensitive)
console.log(`"Clint Eastwood", "Old West Action": ${areAnagramsMap("Clint Eastwood", "Old West Action")}`); // true (ignores spaces/punctuation)
console.log(`"", "": ${areAnagramsMap("", "")}`); // true
console.log(`"a", "a": ${areAnagramsMap("a", "a")}`); // true
console.log(`"a", "b": ${areAnagramsMap("a", "b")}`); // false
console.log(`"aa", "a": ${areAnagramsMap("aa", "a")}`); // false
