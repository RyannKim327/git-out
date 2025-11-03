function areAnagrams(str1: string, str2: string): boolean {
    // Helper function to clean and sort a string
    const cleanAndSort = (str: string): string => {
        return str
            .toLowerCase() // 1. Convert to lowercase
            .replace(/[^a-z0-9]/g, '') // 2. Remove non-alphanumeric characters
            .split('') // 3. Split into an array of characters
            .sort() // 4. Sort the characters alphabetically
            .join(''); // 5. Join them back into a string
    };

    const sortedStr1 = cleanAndSort(str1);
    const sortedStr2 = cleanAndSort(str2);

    // If the sorted strings are identical, they are anagrams
    return sortedStr1 === sortedStr2;
}

// --- Examples ---
console.log(`"listen" and "silent": ${areAnagrams("listen", "silent")}`); // true
console.log(`"hello" and "world": ${areAnagrams("hello", "world")}`);   // false
console.log(`"Anagram" and "Nag a ram": ${areAnagrams("Anagram", "Nag a ram")}`); // true (ignores case and spaces)
console.log(`"Debit card" and "Bad credit": ${areAnagrams("Debit card", "Bad credit")}`); // true
console.log(`"test" and "tset": ${areAnagrams("test", "tset")}`);       // true
console.log(`"rat" and "car": ${areAnagrams("rat", "car")}`);         // false
console.log(`"AABB" and "ABAB": ${areAnagrams("AABB", "ABAB")}`);       // true (same chars, same counts)
console.log(`"" and "": ${areAnagrams("", "")}`);                       // true
console.log(`"a" and "": ${areAnagrams("a", "")}`);                     // false
function areAnagramsFrequencyMap(str1: string, str2: string): boolean {
    // Helper function to clean a string
    const cleanString = (str: string): string => {
        return str
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters
    };

    const cleanedStr1 = cleanString(str1);
    const cleanedStr2 = cleanString(str2);

    // Quick check: If lengths are different after cleaning, they can't be anagrams
    if (cleanedStr1.length !== cleanedStr2.length) {
        return false;
    }

    // Create frequency map for characters
    const createCharMap = (str: string): Map<string, number> => {
        const charMap = new Map<string, number>();
        for (const char of str) {
            charMap.set(char, (charMap.get(char) || 0) + 1);
        }
        return charMap;
    };

    const map1 = createCharMap(cleanedStr1);
    const map2 = createCharMap(cleanedStr2);

    // If the number of unique characters is different, they can't be anagrams
    if (map1.size !== map2.size) {
        return false;
    }

    // Compare counts for each character
    for (const [char, count] of map1) {
        if (map2.get(char) !== count) {
            return false; // Character count mismatch
        }
    }

    return true; // All checks passed, they are anagrams
}

// --- Examples ---
console.log("\n--- Frequency Map Method ---");
console.log(`"listen" and "silent": ${areAnagramsFrequencyMap("listen", "silent")}`); // true
console.log(`"hello" and "world": ${areAnagramsFrequencyMap("hello", "world")}`);   // false
console.log(`"Anagram" and "Nag a ram": ${areAnagramsFrequencyMap("Anagram", "Nag a ram")}`); // true
console.log(`"Debit card" and "Bad credit": ${areAnagramsFrequencyMap("Debit card", "Bad credit")}`); // true
