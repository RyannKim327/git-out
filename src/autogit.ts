function isAnagram(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const charCount: Record<string, number> = {};
    
    // Count characters in first string
    for (const char of str1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Subtract characters from second string
    for (const char of str2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
}

// Usage
console.log(isAnagram("listen", "silent")); // true
console.log(isAnagram("hello", "world"));   // false
function isAnagramSorted(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const normalize = (str: string): string => 
        str.toLowerCase().split('').sort().join('');
    
    return normalize(str1) === normalize(str2);
}
function isAnagramUnicode(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false;
    
    const charMap1 = buildCharMap(str1);
    const charMap2 = buildCharMap(str2);
    
    if (Object.keys(charMap1).length !== Object.keys(charMap2).length) {
        return false;
    }
    
    for (const char in charMap1) {
        if (charMap1[char] !== charMap2[char]) {
            return false;
        }
    }
    
    return true;
}

function buildCharMap(str: string): Record<string, number> {
    const charMap: Record<string, number> = {};
    
    for (const char of str) {
        charMap[char] = (charMap[char] || 0) + 1;
    }
    
    return charMap;
}
function isAnagramCaseInsensitive(str1: string, str2: string): boolean {
    const normalized1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normalized2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    if (normalized1.length !== normalized2.length) return false;
    
    const charCount: Record<string, number> = {};
    
    for (const char of normalized1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of normalized2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
}
interface AnagramOptions {
    caseSensitive?: boolean;
    ignoreSpaces?: boolean;
    ignoreSpecialChars?: boolean;
}

function isAnagramAdvanced(
    str1: string, 
    str2: string, 
    options: AnagramOptions = {}
): boolean {
    let processed1 = str1;
    let processed2 = str2;
    
    if (!options.caseSensitive) {
        processed1 = processed1.toLowerCase();
        processed2 = processed2.toLowerCase();
    }
    
    if (options.ignoreSpaces) {
        processed1 = processed1.replace(/\s/g, '');
        processed2 = processed2.replace(/\s/g, '');
    }
    
    if (options.ignoreSpecialChars) {
        processed1 = processed1.replace(/[^a-z0-9]/gi, '');
        processed2 = processed2.replace(/[^a-z0-9]/gi, '');
    }
    
    if (processed1.length !== processed2.length) return false;
    
    const charCount: Record<string, number> = {};
    
    for (const char of processed1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of processed2) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
}

// Usage examples
console.log(isAnagramAdvanced("Listen", "Silent", { caseSensitive: false })); // true
console.log(isAnagramAdvanced("Funeral", "Real fun", { ignoreSpaces: true })); // true
