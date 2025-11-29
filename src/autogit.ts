function areAnagrams_sorting(s1: string, s2: string): boolean {
    const cleanAndSort = (str: string): string => {
        return str
            .toLowerCase()                 // Convert to lowercase
            .replace(/[^a-z0-9]/g, '')     // Remove non-alphanumeric characters (spaces, punctuation, etc.)
            .split('')                     // Convert string to array of characters
            .sort()                        // Sort the characters
            .join('');                     // Join back into a string
    };

    const cleanS1 = cleanAndSort(s1);
    const cleanS2 = cleanAndSort(s2);

    return cleanS1 === cleanS2;
}

// --- Examples ---
console.log("--- Sorting Method ---");
console.log("'listen' and 'silent':", areAnagrams_sorting('listen', 'silent')); // true
console.log("'hello' and 'world':", areAnagrams_sorting('hello', 'world')); // false
console.log("'Debit card' and 'Bad credit':", areAnagrams_sorting('Debit card', 'Bad credit')); // true
console.log("'A gentleman' and 'Elegant man':", areAnagrams_sorting('A gentleman', 'Elegant man')); // true
console.log("'anagram' and 'nagaram':", areAnagrams_sorting('anagram', 'nagaram')); // true
console.log("'rat' and 'car':", areAnagrams_sorting('rat', 'car')); // false
console.log("'' and '':", areAnagrams_sorting('', '')); // true
console.log("'a' and 'b':", areAnagrams_sorting('a', 'b')); // false
console.log("'a' and 'A':", areAnagrams_sorting('a', 'A')); // true (due to toLowerCase)
function areAnagrams_counting(s1: string, s2: string): boolean {
    const cleanString = (str: string): string => {
        return str
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    };

    const cleanedS1 = cleanString(s1);
    const cleanedS2 = cleanString(s2);

    // If lengths differ after cleaning, they cannot be anagrams
    if (cleanedS1.length !== cleanedS2.length) {
        return false;
    }

    const charCounts = new Map<string, number>();

    // Populate charCounts for the first string
    for (const char of cleanedS1) {
        charCounts.set(char, (charCounts.get(char) || 0) + 1);
    }

    // Decrement counts for characters in the second string
    for (const char of cleanedS2) {
        const count = charCounts.get(char);
        if (count === undefined || count === 0) {
            // Character not found or its count has already reached zero
            return false;
        }
        charCounts.set(char, count - 1);
    }

    // If we reach here, and lengths were equal, all counts must be zero.
    // (No need for an explicit loop to check if all map values are 0 because
    // the length check and decrement logic already guarantee this).
    return true;
}

// --- Examples ---
console.log("\n--- Counting Method ---");
console.log("'listen' and 'silent':", areAnagrams_counting('listen', 'silent')); // true
console.log("'hello' and 'world':", areAnagrams_counting('hello', 'world')); // false
console.log("'Debit card' and 'Bad credit':", areAnagrams_counting('Debit card', 'Bad credit')); // true
console.log("'A gentleman' and 'Elegant man':", areAnagrams_counting('A gentleman', 'Elegant man')); // true
console.log("'anagram' and 'nagaram':", areAnagrams_counting('anagram', 'nagaram')); // true
console.log("'rat' and 'car':", areAnagrams_counting('rat', 'car')); // false
console.log("'' and '':", areAnagrams_counting('', '')); // true
console.log("'a' and 'b':", areAnagrams_counting('a', 'b')); // false
console.log("'a' and 'A':", areAnagrams_counting('a', 'A')); // true
interface AnagramOptions {
    caseSensitive?: boolean;             // Default: false
    ignoreNonAlphanumeric?: boolean;     // Default: true (includes spaces, punctuation, symbols)
    // You could add more granular options like ignoreSpaces only, ignorePunctuation only etc.
    // but ignoreNonAlphanumeric covers the most common use case.
}

function areAnagrams(s1: string, s2: string, options?: AnagramOptions): boolean {
    const defaultOptions: Required<AnagramOptions> = {
        caseSensitive: false,
        ignoreNonAlphanumeric: true,
    };
    const mergedOptions = { ...defaultOptions, ...options };

    const cleanString = (str: string): string => {
        let processed = str;

        if (!mergedOptions.caseSensitive) {
            processed = processed.toLowerCase();
        }

        if (mergedOptions.ignoreNonAlphanumeric) {
            processed = processed.replace(/[^a-z0-9]/g, ''); // Removes anything not a-z or 0-9
        }
        // If you wanted to ignore only spaces if ignoreNonAlphanumeric is false:
        // else if (mergedOptions.ignoreSpaces) {
        //     processed = processed.replace(/\s/g, '');
        // }

        return processed.split('').sort().join('');
    };

    const cleanedS1 = cleanString(s1);
    const cleanedS2 = cleanString(s2);

    return cleanedS1 === cleanedS2;
}

// --- Examples ---
console.log("\n--- Configurable Method ---");

// Default behavior (ignore case, ignore non-alphanumeric)
console.log("Default: 'Listen' and 'Silent':", areAnagrams('Listen', 'Silent')); // true
console.log("Default: 'Debit card' and 'Bad credit':", areAnagrams('Debit card', 'Bad credit')); // true

// Case-sensitive check
console.log("Case-sensitive: 'Listen' and 'silent':", areAnagrams('Listen', 'silent', { caseSensitive: true })); // false
console.log("Case-sensitive: 'abc' and 'bca':", areAnagrams('abc', 'bca', { caseSensitive: true })); // true

// Don't ignore non-alphanumeric (spaces, punctuation now matter)
console.log("Include spaces: 'hello world' and 'world hello':", areAnagrams('hello world', 'world hello', { ignoreNonAlphanumeric: false })); // true
console.log("Include spaces: 'hello world' and 'helloworld':", areAnagrams('hello world', 'helloworld', { ignoreNonAlphanumeric: false })); // false
console.log("Include punctuation: 'hello!' and 'hello':", areAnagrams('hello!', 'hello', { ignoreNonAlphanumeric: false })); // false
console.log("Include punctuation: 'a.b' and 'b.a':", areAnagrams('a.b', 'b.a', { ignoreNonAlphanumeric: false })); // true
