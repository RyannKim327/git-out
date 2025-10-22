function areAnagrams(str1: string, str2: string): boolean {
    // Remove spaces and convert to lowercase for case-insensitive comparison
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    // If lengths are different, they can't be anagrams
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    // Sort characters and compare
    return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
}

// Examples
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
console.log(areAnagrams('Dormitory', 'dirty room')); // true
function areAnagramsFrequency(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    const charCount: Record<string, number> = {};
    
    // Count characters in first string
    for (const char of cleanStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract counts for second string
    for (const char of cleanStr2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}

// Examples
console.log(areAnagramsFrequency('listen', 'silent')); // true
console.log(areAnagramsFrequency('hello', 'world'));   // false
function areAnagramsMap(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Build frequency map for first string
    for (const char of cleanStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Check against second string
    for (const char of cleanStr2) {
        const count = charMap.get(char);
        if (!count) {
            return false;
        }
        charMap.set(char, count - 1);
    }
    
    return true;
}
const areAnagramsOneLiner = (str1: string, str2: string): boolean => {
    const normalize = (s: string) => s.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
    return normalize(str1) === normalize(str2);
};
function areStrictAnagrams(str1: string, str2: string): boolean {
    // Only consider alphanumeric characters
    const cleanStr1 = str1.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
}
