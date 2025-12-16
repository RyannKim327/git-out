function firstNonRepeatingChar(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // Count occurrences of each character
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

// Example usage
console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("aabbcc")); // null
function firstNonRepeatingCharMap(str: string): string | null {
    const charCount = new Map<string, number>();
    
    // Count occurrences
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
function firstNonRepeatingCharStrict(str: string): string | null {
    type CharCount = Record<string, number>;
    
    const charCount: CharCount = {};
    
    for (const char of str) {
        charCount[char] = (charCount[char] ?? 0) + 1;
    }
    
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingCharWithOptions(
    str: string, 
    options: { caseSensitive?: boolean } = {}
): string | null {
    const { caseSensitive = true } = options;
    const processedStr = caseSensitive ? str : str.toLowerCase();
    
    const charCount: { [key: string]: number } = {};
    
    for (const char of processedStr) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (let i = 0; i < processedStr.length; i++) {
        if (charCount[processedStr[i]] === 1) {
            return caseSensitive ? str[i] : str[i].toLowerCase();
        }
    }
    
    return null;
}

// Examples
console.log(firstNonRepeatingCharWithOptions("Swiss")); // "S" (case sensitive)
console.log(firstNonRepeatingCharWithOptions("Swiss", { caseSensitive: false })); // "w"
const firstNonRepeatingCharOneLiner = (str: string): string | null => 
    str.split('').find((char, _, arr) => 
        arr.filter(c => c === char).length === 1
    ) || null;

// Note: This is less efficient for large strings (O(n²))
function firstNonRepeatingChar(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}

// Test cases
const testCases: Array<[string, string | null]> = [
    ["swiss", "w"],
    ["hello", "h"],
    ["aabbcc", null],
    ["abcabc", null],
    ["z", "z"],
    ["", null],
    ["stress", "t"]
];

// Run tests
testCases.forEach(([input, expected]) => {
    const result = firstNonRepeatingChar(input);
    console.log(`"${input}" -> Expected: ${expected}, Got: ${result}, ${expected === result ? '✓' : '✗'}`);
});
