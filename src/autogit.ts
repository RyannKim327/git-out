function areAnagrams(str1: string, str2: string): boolean {
    // Remove spaces and convert to lowercase for case-insensitive comparison
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    // Check if lengths are different
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    // Sort characters and compare
    const sortedStr1 = cleanStr1.split('').sort().join('');
    const sortedStr2 = cleanStr2.split('').sort().join('');
    
    return sortedStr1 === sortedStr2;
}

// Example usage
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
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

// Example usage
console.log(areAnagramsFrequency('triangle', 'integral')); // true
console.log(areAnagramsFrequency('apple', 'pale'));       // false
function areAnagramsMap(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/\s+/g, '').toLowerCase();
    const cleanStr2 = str2.replace(/\s+/g, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Count characters in first string
    for (const char of cleanStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Check characters in second string
    for (const char of cleanStr2) {
        const count = charMap.get(char);
        if (!count) {
            return false;
        }
        charMap.set(char, count - 1);
    }
    
    // Verify all counts are zero
    for (const count of charMap.values()) {
        if (count !== 0) {
            return false;
        }
    }
    
    return true;
}
const areAnagramsOneLiner = (str1: string, str2: string): boolean => 
    str1.replace(/\s+/g, '').toLowerCase().split('').sort().join('') === 
    str2.replace(/\s+/g, '').toLowerCase().split('').sort().join('');

// Example usage
console.log(areAnagramsOneLiner('debit card', 'bad credit')); // true
