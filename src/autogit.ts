function isAnagram(str1: string, str2: string): boolean {
    // Remove non-alphanumeric characters and convert to lowercase
    const normalize = (str: string): string => 
        str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    // Check length first for quick exit
    if (normalized1.length !== normalized2.length) {
        return false;
    }
    
    // Sort and compare
    const sorted1 = normalized1.split('').sort().join('');
    const sorted2 = normalized2.split('').sort().join('');
    
    return sorted1 === sorted2;
}

// Examples
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
console.log(isAnagram("Debit card", "Bad credit")); // true
function isAnagramFrequency(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    if (normalized1.length !== normalized2.length) {
        return false;
    }
    
    const charCount: Record<string, number> = {};
    
    // Count characters in first string
    for (const char of normalized1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract counts for second string
    for (const char of normalized2) {
        if (!charCount[char]) {
            return false;
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}
function isAnagramMap(str1: string, str2: string): boolean {
    const normalize = (str: string): string => 
        str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    
    const normalized1 = normalize(str1);
    const normalized2 = normalize(str2);
    
    if (normalized1.length !== normalized2.length) {
        return false;
    }
    
    const charMap = new Map<string, number>();
    
    // Build character frequency map
    for (const char of normalized1) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Check against second string
    for (const char of normalized2) {
        const count = charMap.get(char);
        if (!count) return false;
        charMap.set(char, count - 1);
    }
    
    return true;
}
const isAnagramOneLiner = (str1: string, str2: string): boolean => {
    const normalize = (s: string) => s.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const sorted = (s: string) => s.split('').sort().join('');
    return sorted(normalize(str1)) === sorted(normalize(str2));
};
interface AnagramOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
    ignoreSpecialChars?: boolean;
}

function isAnagram(
    str1: string, 
    str2: string, 
    options: AnagramOptions = {}
): boolean {
    const {
        caseSensitive = false,
        ignoreSpaces = true,
        ignoreSpecialChars = true
    } = options;

    let processed1 = str1;
    let processed2 = str2;

    // Apply options
    if (!caseSensitive) {
        processed1 = processed1.toLowerCase();
        processed2 = processed2.toLowerCase();
    }

    if (ignoreSpaces) {
        processed1 = processed1.replace(/\s/g, '');
        processed2 = processed2.replace(/\s/g, '');
    }

    if (ignoreSpecialChars) {
        processed1 = processed1.replace(/[^a-z0-9]/gi, '');
        processed2 = processed2.replace(/[^a-z0-9]/gi, '');
    }

    // Quick length check
    if (processed1.length !== processed2.length) {
        return false;
    }

    // Character frequency comparison
    const frequency: Record<string, number> = {};
    
    for (const char of processed1) {
        frequency[char] = (frequency[char] || 0) + 1;
    }

    for (const char of processed2) {
        if (!frequency[char]) return false;
        frequency[char]--;
    }

    return Object.values(frequency).every(count => count === 0);
}

// Usage examples
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("Hello", "World")); // false
console.log(isAnagram("Debit card", "Bad credit", { ignoreSpaces: false })); // true
