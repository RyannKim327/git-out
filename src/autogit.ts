function firstNonRepeatingChar(str: string): string | null {
    const charCount: Map<string, number> = new Map();
    
    // Build frequency map
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
console.log(firstNonRepeatingChar("aabbcc")); // null
console.log(firstNonRepeatingChar("typescript")); // "t"
function firstNonRepeatingCharObj(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // Count occurrences
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first non-repeating character
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingCharOnePass(str: string): string | null {
    const charCount: Map<string, number> = new Map();
    const firstOccurrence: Map<string, number> = new Map();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        charCount.set(char, (charCount.get(char) || 0) + 1);
        if (!firstOccurrence.has(char)) {
            firstOccurrence.set(char, i);
        }
    }
    
    // Find character with count = 1 and smallest first occurrence index
    let result: string | null = null;
    let minIndex = Infinity;
    
    for (const [char, count] of charCount) {
        if (count === 1) {
            const index = firstOccurrence.get(char)!;
            if (index < minIndex) {
                minIndex = index;
                result = char;
            }
        }
    }
    
    return result;
}
function firstNonRepeatingCharFunctional(str: string): string | null {
    const charArray = str.split('');
    const charCount = charArray.reduce((count, char) => {
        count[char] = (count[char] || 0) + 1;
        return count;
    }, {} as { [key: string]: number });
    
    const result = charArray.find(char => charCount[char] === 1);
    return result || null;
}
function firstNonRepeatingCharComplete(str: string): string | null {
    if (str.length === 0) return null;
    
    const charCount: Map<string, number> = new Map();
    
    // Count character occurrences
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Find first non-repeating character
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}

// Test cases
const testCases = [
    "swiss",           // "w"
    "aabbcc",          // null
    "typescript",      // "t"
    "hello",           // "h"
    "a",               // "a"
    "",                // null
    "abcabc",          // null
    "stress",          // "t"
];

testCases.forEach(test => {
    console.log(`"${test}" -> "${firstNonRepeatingCharComplete(test)}"`);
});
