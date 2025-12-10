function isAnagram(str1: string, str2: string): boolean {
    // Normalize strings (remove spaces, convert to lowercase)
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/\s/g, '');
    
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);
    
    // Check if lengths are different
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    // Sort and compare
    return normalizedStr1.split('').sort().join('') === 
           normalizedStr2.split('').sort().join('');
}

// Usage
console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world'));   // false
function isAnagram(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/\s/g, '');
    
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
    
    // Subtract counts for second string
    for (const char of normalizedStr2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}
function isAnagram(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/\s/g, '');
    
    const normalizedStr1 = normalize(str1);
    const normalizedStr2 = normalize(str2);
    
    if (normalizedStr1.length !== normalizedStr2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Build character map for first string
    for (const char of normalizedStr1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Check against second string
    for (const char of normalizedStr2) {
        const count = charMap.get(char);
        if (!count) return false;
        charMap.set(char, count - 1);
    }
    
    return true;
}
const isAnagram = (str1: string, str2: string): boolean => {
    const normalize = (s: string) => s.toLowerCase().replace(/\s/g, '');
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    return normalized1.length === normalized2.length && 
           [...normalized1].sort().join('') === [...normalized2].sort().join('');
};
interface AnagramOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
}

function isAnagram(
    str1: string, 
    str2: string, 
    options: AnagramOptions = {}
): boolean {
    const { caseSensitive = false, ignoreSpaces = true } = options;
    
    let processedStr1 = str1;
    let processedStr2 = str2;
    
    if (!caseSensitive) {
        processedStr1 = processedStr1.toLowerCase();
        processedStr2 = processedStr2.toLowerCase();
    }
    
    if (ignoreSpaces) {
        processedStr1 = processedStr1.replace(/\s/g, '');
        processedStr2 = processedStr2.replace(/\s/g, '');
    }
    
    if (processedStr1.length !== processedStr2.length) {
        return false;
    }
    
    const charCount: Record<string, number> = {};
    
    for (const char of processedStr1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of processedStr2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return Object.values(charCount).every(count => count === 0);
}

// Usage examples
console.log(isAnagram('Listen', 'Silent')); // true
console.log(isAnagram('hello', 'world'));   // false
console.log(isAnagram('Astronomer', 'Moon starer')); // true
