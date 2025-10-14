function isAnagram(str1: string, str2: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr1 = str1.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    // If lengths are different, they can't be anagrams
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    // Sort and compare
    return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
}

// Examples
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("rail safety", "fairy tales")); // true
function isAnagramFrequency(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    const charCount: { [key: string]: number } = {};
    
    // Count characters in first string
    for (const char of cleanStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract characters from second string
    for (const char of cleanStr2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    return true;
}
function isAnagramMap(str1: string, str2: string): boolean {
    const cleanStr1 = str1.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Build frequency map from first string
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
const isAnagramOneLiner = (str1: string, str2: string): boolean => 
    str1.replace(/[^a-z0-9]/gi, '').toLowerCase().split('').sort().join('') === 
    str2.replace(/[^a-z0-9]/gi, '').toLowerCase().split('').sort().join('');
interface AnagramCheckResult {
    isAnagram: boolean;
    message?: string;
}

function checkAnagram(str1: string, str2: string): AnagramCheckResult {
    // Input validation
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        return { isAnagram: false, message: 'Both inputs must be strings' };
    }
    
    const cleanStr1 = str1.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const cleanStr2 = str2.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    if (cleanStr1.length !== cleanStr2.length) {
        return { 
            isAnagram: false, 
            message: 'Strings have different lengths after cleaning' 
        };
    }
    
    const charCount: { [key: string]: number } = {};
    
    for (const char of cleanStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of cleanStr2) {
        if (!charCount[char]) {
            return { isAnagram: false, message: 'Character frequency mismatch' };
        }
        charCount[char]--;
    }
    
    return { isAnagram: true };
}

// Usage
const result = checkAnagram("listen", "silent");
console.log(result); // { isAnagram: true }
