function firstNonRepeatingChar(str: string): string | null {
    const charCount: Map<string, number> = new Map();
    
    // Count frequency of each character
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Find first character with count = 1
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null; // No non-repeating character found
}

// Example usage
console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("hello")); // "h"
console.log(firstNonRepeatingChar("aabbcc")); // null
function firstNonRepeatingCharOptimized(str: string): string | null {
    const charIndex: Map<string, number> = new Map();
    const uniqueChars: Set<string> = new Set();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (charIndex.has(char)) {
            uniqueChars.delete(char);
        } else {
            charIndex.set(char, i);
            uniqueChars.add(char);
        }
    }
    
    if (uniqueChars.size === 0) return null;
    
    // Find the one with smallest index
    let minIndex = Infinity;
    let result: string | null = null;
    
    for (const char of uniqueChars) {
        const index = charIndex.get(char)!;
        if (index < minIndex) {
            minIndex = index;
            result = char;
        }
    }
    
    return result;
}
function firstNonRepeatingCharObject(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // Count frequency
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first non-repeating
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingCharCaseInsensitive(str: string): string | null {
    const lowerStr = str.toLowerCase();
    const charCount: Map<string, { count: number, original: string }> = new Map();
    
    for (let i = 0; i < str.length; i++) {
        const lowerChar = lowerStr[i];
        const originalChar = str[i];
        
        if (charCount.has(lowerChar)) {
            const data = charCount.get(lowerChar)!;
            data.count++;
            charCount.set(lowerChar, data);
        } else {
            charCount.set(lowerChar, { count: 1, original: originalChar });
        }
    }
    
    for (let i = 0; i < lowerStr.length; i++) {
        const lowerChar = lowerStr[i];
        const data = charCount.get(lowerChar)!;
        
        if (data.count === 1) {
            return data.original;
        }
    }
    
    return null;
}

// Example usage
console.log(firstNonRepeatingCharCaseInsensitive("Swiss")); // "w"
console.log(firstNonRepeatingCharCaseInsensitive("Hello")); // "H"
type NonRepeatingResult = {
    char: string;
    index: number;
} | null;

function findFirstNonRepeating(str: string): NonRepeatingResult {
    const charCount: Map<string, number> = new Map();
    const charFirstIndex: Map<string, number> = new Map();
    
    // First pass: build character information
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        charCount.set(char, (charCount.get(char) || 0) + 1);
        
        if (!charFirstIndex.has(char)) {
            charFirstIndex.set(char, i);
        }
    }
    
    // Second pass: find first non-repeating character
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charCount.get(char) === 1) {
            return {
                char: char,
                index: charFirstIndex.get(char)!
            };
        }
    }
    
    return null;
}

// Example usage
console.log(findFirstNonRepeating("programming")); // { char: "p", index: 0 }
console.log(findFirstNonRepeating("aabbcc")); // null
