function isAnagram(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) {
        return false;
    }

    const charCount: { [key: string]: number } = {};

    // Count characters in first string
    for (const char of str1.toLowerCase()) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    // Subtract characters from second string
    for (const char of str2.toLowerCase()) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }

    return true;
}
function isAnagramWithSort(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) {
        return false;
    }

    const sorted1 = str1.toLowerCase().split('').sort().join('');
    const sorted2 = str2.toLowerCase().split('').sort().join('');

    return sorted1 === sorted2;
}
function isAnagramWithMap(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) {
        return false;
    }

    const charMap = new Map<string, number>();

    // Count characters in first string
    for (const char of str1.toLowerCase()) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }

    // Check characters in second string
    for (const char of str2.toLowerCase()) {
        const count = charMap.get(char);
        if (!count) {
            return false;
        }
        charMap.set(char, count - 1);
    }

    return true;
}
const isAnagramFunctional = (str1: string, str2: string): boolean => {
    const normalize = (str: string): string => 
        str.toLowerCase().split('').sort().join('');
    
    return str1.length === str2.length && normalize(str1) === normalize(str2);
};
// Test the functions
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));       // false

// Case insensitive examples
console.log(isAnagram("Listen", "Silent")); // true
console.log(isAnagram("Dormitory", "Dirty room")); // false (spaces matter)
function isAnagramEnhanced(str1: string, str2: string, ignoreSpaces: boolean = false): boolean {
    let processed1 = str1.toLowerCase();
    let processed2 = str2.toLowerCase();

    if (ignoreSpaces) {
        processed1 = processed1.replace(/\s+/g, '');
        processed2 = processed2.replace(/\s+/g, '');
    }

    if (processed1.length !== processed2.length) {
        return false;
    }

    const charCount: Record<string, number> = {};

    for (const char of processed1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (const char of processed2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }

    return true;
}
