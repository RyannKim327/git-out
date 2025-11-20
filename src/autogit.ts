function firstNonRepeatingChar(str: string): string | null {
    const charCount: Map<string, number> = new Map();
    
    // First pass: count character occurrences
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Second pass: find first character with count = 1
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
    const charCount: Record<string, number> = {};
    
    // Count character occurrences
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
const firstNonRepeatingChar = (str: string): string | null => {
    const frequency: Map<string, number> = new Map();
    
    // Build frequency map
    str.split('').forEach(char => {
        frequency.set(char, (frequency.get(char) || 0) + 1);
    });
    
    // Return first character with frequency 1
    return str.split('').find(char => frequency.get(char) === 1) || null;
};
function firstNonRepeatingCharEnhanced(str: string): string | null {
    if (!str || str.length === 0) return null;
    
    const charCount = new Map<string, number>();
    const charOrder: string[] = [];
    
    // Single pass to track count and order
    for (const char of str) {
        if (!charCount.has(char)) {
            charCount.set(char, 1);
            charOrder.push(char);
        } else {
            charCount.set(char, charCount.get(char)! + 1);
        }
    }
    
    // Find first non-repeating character from ordered list
    for (const char of charOrder) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingChar(str: string): string | null {
    const charCount: Map<string, number> = new Map();
    
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}

// Test cases
const testCases = [
    { input: "swiss", expected: "w" },
    { input: "typescript", expected: "t" },
    { input: "aabbcc", expected: null },
    { input: "hello", expected: "h" },
    { input: "", expected: null },
    { input: "a", expected: "a" },
    { input: "aabbccd", expected: "d" }
];

testCases.forEach(({ input, expected }) => {
    const result = firstNonRepeatingChar(input);
    console.log(`Input: "${input}" -> Expected: ${expected}, Got: ${result}`);
});
