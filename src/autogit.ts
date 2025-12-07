function areAnagrams(str1: string, str2: string): boolean {
    // Remove spaces and convert to lowercase for case-insensitive comparison
    const normalize = (s: string): string => s.replace(/\s+/g, '').toLowerCase();
    
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);
    
    // If lengths are different, they can't be anagrams
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    // Sort characters and compare
    const sortedStr1 = normalizedStr1.split('').sort().join('');
    const sortedStr2 = normalizedStr2.split('').sort().join('');
    
    return sortedStr1 === sortedStr2;
}

// Examples
console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
console.log(areAnagrams("Debit card", "Bad credit")); // true
function areAnagramsFrequency(str1: string, str2: string): boolean {
    const normalize = (s: string): string => s.replace(/\s+/g, '').toLowerCase();
    
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);
    
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    const charCount: Record<string, number> = {};
    
    // Count characters in first string
    for (const char of normalizedStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract characters from second string
    for (const char of normalizedStr2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}
function areAnagramsMap(str1: string, str2: string): boolean {
    const normalize = (s: string): string => s.replace(/\s+/g, '').toLowerCase();
    
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);
    
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Build frequency map for first string
    for (const char of normalizedStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Check second string against the map
    for (const char of normalizedStr2) {
        const count = charMap.get(char);
        if (!count) {
            return false;
        }
        charMap.set(char, count - 1);
    }
    
    return true;
}
const areAnagramsOneLiner = (str1: string, str2: string): boolean => {
    const normalize = (s: string): string => s.replace(/\s+/g, '').toLowerCase();
    return normalize(str1).split('').sort().join('') === normalize(str2).split('').sort().join('');
};
function areAnagrams(str1: string, str2: string, caseSensitive: boolean = false): boolean {
    // Handle null/undefined inputs
    if (str1 == null || str2 == null) return false;
    
    let processedStr1 = str1;
    let processedStr2 = str2;
    
    // Remove spaces if needed
    processedStr1 = processedStr1.replace(/\s+/g, '');
    processedStr2 = processedStr2.replace(/\s+/g, '');
    
    // Handle case sensitivity
    if (!caseSensitive) {
        processedStr1 = processedStr1.toLowerCase();
        processedStr2 = processedStr2.toLowerCase();
    }
    
    // Quick length check
    if (processedStr1.length !== processedStr2.length) {
        return false;
    }
    
    // Frequency count approach
    const frequency: Record<string, number> = {};
    
    for (const char of processedStr1) {
        frequency[char] = (frequency[char] || 0) + 1;
    }
    
    for (const char of processedStr2) {
        if (!frequency[char]) {
            return false;
        }
        frequency[char]--;
    }
    
    return true;
}

// Test cases
const testCases = [
    { str1: "listen", str2: "silent", expected: true },
    { str1: "hello", str2: "world", expected: false },
    { str1: "Debit card", str2: "Bad credit", expected: true },
    { str1: "abc", str2: "abcd", expected: false },
];

testCases.forEach(({ str1, str2, expected }) => {
    const result = areAnagrams(str1, str2);
    console.log(`"${str1}" vs "${str2}": ${result} (expected: ${expected})`);
});
