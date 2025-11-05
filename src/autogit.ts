function areAnagrams(str1: string, str2: string): boolean {
    // Remove spaces and convert to lowercase for case-insensitive comparison
    const normalizedStr1 = str1.replace(/\s/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/\s/g, '').toLowerCase();
    
    // Sort characters and compare
    return normalizedStr1.split('').sort().join('') === 
           normalizedStr2.split('').sort().join('');
}

// Example usage
console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world'));   // false
function areAnagrams(str1: string, str2: string): boolean {
    const normalizedStr1 = str1.replace(/\s/g, '').toLowerCase();
    const normalizedStr2 = str2.replace(/\s/g, '').toLowerCase();
    
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    const charCount: Record<string, number> = {};
    
    // Count characters in first string
    for (const char of normalizedStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract counts using second string
    for (const char of normalizedStr2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}

// Example usage
console.log(areAnagrams('triangle', 'integral')); // true
function areAnagrams(str1: string, str2: string): boolean {
    const normalizeString = (str: string): string[] => {
        return Array.from(str.replace(/\s/g, '').toLowerCase().normalize());
    };
    
    const arr1 = normalizeString(str1);
    const arr2 = normalizeString(str2);
    
    if (arr1.length !== arr2.length) return false;
    
    const charMap = new Map<string, number>();
    
    // Count characters
    for (const char of arr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Verify counts
    for (const char of arr2) {
        const count = charMap.get(char);
        if (!count) return false;
        charMap.set(char, count - 1);
    }
    
    return true;
}
const areAnagrams = (a: string, b: string): boolean => 
    a.replace(/\s/g, '').toLowerCase().split('').sort().join('') === 
    b.replace(/\s/g, '').toLowerCase().split('').sort().join('');
// Enhanced version with type checking and edge cases
function areAnagrams(str1: string, str2: string, caseSensitive = false): boolean {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }
    
    let processedStr1 = str1.replace(/\s/g, '');
    let processedStr2 = str2.replace(/\s/g, '');
    
    if (!caseSensitive) {
        processedStr1 = processedStr1.toLowerCase();
        processedStr2 = processedStr2.toLowerCase();
    }
    
    if (processedStr1.length !== processedStr2.length) {
        return false;
    }
    
    return processedStr1.split('').sort().join('') === 
           processedStr2.split('').sort().join('');
}
