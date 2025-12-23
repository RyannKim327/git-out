function isAnagram(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) {
        return false;
    }
    
    const charCount: { [key: string]: number } = {};
    
    // Count characters in first string
    for (let char of str1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract characters from second string
    for (let char of str2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    return true;
}

// Example usage
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
function isAnagramSimple(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) {
        return false;
    }
    
    const sorted1 = str1.split('').sort().join('');
    const sorted2 = str2.split('').sort().join('');
    
    return sorted1 === sorted2;
}

// Example usage
console.log(isAnagramSimple("triangle", "integral")); // true
function isAnagramCaseInsensitive(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    if (normalized1.length !== normalized2.length) {
        return false;
    }
    
    const sorted1 = normalized1.split('').sort().join('');
    const sorted2 = normalized2.split('').sort().join('');
    
    return sorted1 === sorted2;
}

// Example usage - handles different cases and ignores non-alphanumeric characters
console.log(isAnagramCaseInsensitive("Eleven plus two", "Twelve plus one")); // true
function isAnagramRobust(str1: string, str2: string): boolean {
    // Input validation
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        return false;
    }
    
    // Early return for different lengths
    if (str1.length !== str2.length) {
        return false;
    }
    
    // Character frequency counting
    const frequencyMap = new Map<string, number>();
    
    // Build frequency map from first string
    for (const char of str1) {
        frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }
    
    // Check against second string
    for (const char of str2) {
        const count = frequencyMap.get(char);
        
        if (!count) {
            return false;
        }
        
        if (count === 1) {
            frequencyMap.delete(char);
        } else {
            frequencyMap.set(char, count - 1);
        }
    }
    
    return frequencyMap.size === 0;
}

// Example usage
console.log(isAnagramRobust("anagram", "nagaram")); // true
const isAnagramOneLiner = (str1: string, str2: string): boolean => 
    str1.length === str2.length && 
    [...str1].sort().join('') === [...str2].sort().join('');

// Example usage
console.log(isAnagramOneLiner("rat", "tar")); // true
