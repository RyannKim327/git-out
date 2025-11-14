function areAnagramsBySorting(s1: string, s2: string): boolean {
    // Helper function to normalize the string
    // This includes:
    // 1. Converting to lowercase
    // 2. Removing all non-alphanumeric characters (spaces, punctuation, etc.)
    const normalize = (str: string): string => {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    const cleanedS1 = normalize(s1);
    const cleanedS2 = normalize(s2);

    // If lengths are different after normalization, they cannot be anagrams
    if (cleanedS1.length !== cleanedS2.length) {
        return false;
    }

    // Sort the characters of both cleaned strings and compare them
    const sortedS1 = cleanedS1.split('').sort().join('');
    const sortedS2 = cleanedS2.split('').sort().join('');

    return sortedS1 === sortedS2;
}

// --- Test Cases ---
console.log("--- Method 1: Sorting Characters ---");
console.log(`"listen", "silent": ${areAnagramsBySorting("listen", "silent")}`); // true
console.log(`"Hello", "world": ${areAnagramsBySorting("Hello", "world")}`);   // false
console.log(`"Debit Card", "Bad Credit": ${areAnagramsBySorting("Debit Card", "Bad Credit")}`); // true (ignores case and spaces)
console.log(`"A gentleman", "Elegant man": ${areAnagramsBySorting("A gentleman", "Elegant man")}`); // true
console.log(`"Elvis", "Lives": ${areAnagramsBySorting("Elvis", "Lives")}`); // true
console.log(`"", "": ${areAnagramsBySorting("", "")}`); // true
console.log(`"a", "": ${areAnagramsBySorting("a", "")}`); // false
console.log(`"rail safety", "fairy tales": ${areAnagramsBySorting("rail safety", "fairy tales")}`); // true
console.log(`"The quick brown fox", "fox brown quick the": ${areAnagramsBySorting("The quick brown fox", "fox brown quick the")}`); // true (if order is changed, but characters and counts are same)
console.log(`"Anagram?", "Nag a ram!": ${areAnagramsBySorting("Anagram?", "Nag a ram!")}`); // true
function areAnagramsByCounting(s1: string, s2: string): boolean {
    const normalize = (str: string): string => {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
    };

    const cleanedS1 = normalize(s1);
    const cleanedS2 = normalize(s2);

    if (cleanedS1.length !== cleanedS2.length) {
        return false;
    }

    const charCounts = new Map<string, number>();

    // Populate the map with character counts from cleanedS1
    for (const char of cleanedS1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // Iterate through cleanedS2, decrementing counts
    for (const char of cleanedS2) {
        const count = charCounts.get(char);
        if (count === undefined || count === 0) {
            // Character not found in s1 or its count is already 0
            return false;
        }
        charCounts.set(char, count - 1);
    }

    // At this point, all counts in charCounts should be zero.
    // We don't need to explicitly check all map values because
    // the initial length check combined with the decrement logic
    // ensures this. If a character was present in s1 but not s2,
    // its count wouldn't be decremented to 0. But because lengths are equal,
    // and we've processed all chars from s2, every char from s1 must have
    // been matched and decremented.
    return true;
}

// --- Test Cases ---
console.log("\n--- Method 2: Character Counting ---");
console.log(`"listen", "silent": ${areAnagramsByCounting("listen", "silent")}`); // true
console.log(`"Hello", "world": ${areAnagramsByCounting("Hello", "world")}`);   // false
console.log(`"Debit Card", "Bad Credit": ${areAnagramsByCounting("Debit Card", "Bad Credit")}`); // true
console.log(`"A gentleman", "Elegant man": ${areAnagramsByCounting("A gentleman", "Elegant man")}`); // true
console.log(`"Elvis", "Lives": ${areAnagramsByCounting("Elvis", "Lives")}`); // true
console.log(`"", "": ${areAnagramsByCounting("", "")}`); // true
console.log(`"a", "": ${areAnagramsByCounting("a", "")}`); // false
console.log(`"rail safety", "fairy tales": ${areAnagramsByCounting("rail safety", "fairy tales")}`); // true
console.log(`"Anagram?", "Nag a ram!": ${areAnagramsByCounting("Anagram?", "Nag a ram!")}`); // true
