function firstNonRepeatingChar(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // Count frequency of each character
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first character with count = 1
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null; // No non-repeating character found
}

// Usage
console.log(firstNonRepeatingChar("typescript")); // "t"
console.log(firstNonRepeatingChar("aabbcc"));     // null
console.log(firstNonRepeatingChar("hello"));      // "h"
function firstNonRepeatingCharMap(str: string): string | null {
    const charMap = new Map<string, number>();
    
    // Build frequency map
    for (const char of str) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Find first character with count = 1
    for (const char of str) {
        if (charMap.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}
const firstNonRepeatingCharOneLiner = (str: string): string | null => {
    return str.split('').find((char, _, arr) => 
        arr.indexOf(char) === arr.lastIndexOf(char)
    ) || null;
};
function firstNonRepeatingCharCaseInsensitive(str: string): string | null {
    const lowerStr = str.toLowerCase();
    const charCount: { [key: string]: number } = {};
    
    // Count frequency (case-insensitive)
    for (const char of lowerStr) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Return original case character
    for (let i = 0; i < str.length; i++) {
        if (charCount[lowerStr[i]] === 1) {
            return str[i];
        }
    }
    
    return null;
}

// Usage
console.log(firstNonRepeatingCharCaseInsensitive("TypeScript")); // "T"
interface CharInfo {
    count: number;
    firstIndex: number;
}

function firstNonRepeatingCharDetailed(str: string): { char: string | null, index: number } {
    const charMap = new Map<string, CharInfo>();
    
    // Build detailed character map
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const existing = charMap.get(char);
        
        if (existing) {
            charMap.set(char, { 
                count: existing.count + 1, 
                firstIndex: existing.firstIndex 
            });
        } else {
            charMap.set(char, { count: 1, firstIndex: i });
        }
    }
    
    // Find character with count = 1 and smallest index
    let result: { char: string | null, index: number } = { char: null, index: -1 };
    
    for (const [char, info] of charMap) {
        if (info.count === 1 && (result.index === -1 || info.firstIndex < result.index)) {
            result = { char, index: info.firstIndex };
        }
    }
    
    return result;
}

// Usage
console.log(firstNonRepeatingCharDetailed("typescript")); 
// { char: "t", index: 0 }
function findFirstNonRepeatingCharacter(input: string): string | null {
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    if (input.length === 0) {
        return null;
    }
    
    const charCount: { [key: string]: number } = {};
    
    // Count character frequencies
    for (const char of input) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first non-repeating character
    for (const char of input) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}

// Test cases
const testCases = [
    "typescript",
    "aabbcc",
    "hello world",
    "swiss",
    "",
    "a",
    "aa",
    "abacabad"
];

testCases.forEach(test => {
    console.log(`"${test}" -> "${findFirstNonRepeatingCharacter(test)}"`);
});
