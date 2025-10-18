function firstNonRepeatingChar(str: string): string | null {
    const frequencyMap: Record<string, number> = {};
    
    // Count frequency of each character
    for (const char of str) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    
    // Find first character with frequency 1
    for (const char of str) {
        if (frequencyMap[char] === 1) {
            return char;
        }
    }
    
    return null; // Return null if no non-repeating character found
}

// Example usage
console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("aabb"));  // null
function firstNonRepeatingChar(str: string): string | null {
    const result = str.split('').find((char, _, arr) => 
        arr.indexOf(char) === arr.lastIndexOf(char)
    );
    
    return result || null;
}

// Example usage
console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("aabb"));  // null
function firstNonRepeatingChar(str: string): string | null {
    const charMap = new Map<string, number>();
    const order: string[] = [];
    
    for (const char of str) {
        if (charMap.has(char)) {
            charMap.set(char, charMap.get(char)! + 1);
        } else {
            charMap.set(char, 1);
            order.push(char);
        }
    }
    
    for (const char of order) {
        if (charMap.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}

// Example usage
console.log(firstNonRepeatingChar("swiss")); // "w"
console.log(firstNonRepeatingChar("aabb"));  // null
function firstNonRepeatingCharCaseInsensitive(str: string): string | null {
    const lowerStr = str.toLowerCase();
    const frequencyMap: Record<string, number> = {};
    
    // Count frequency (case-insensitive)
    for (const char of lowerStr) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    
    // Return original case character
    for (let i = 0; i < str.length; i++) {
        const lowerChar = str[i].toLowerCase();
        if (frequencyMap[lowerChar] === 1) {
            return str[i];
        }
    }
    
    return null;
}

// Example usage
console.log(firstNonRepeatingCharCaseInsensitive("SwIss")); // "w"
function firstNonRepeatingChar(str: string): string | null {
    if (!str.length) return null;
    
    const frequencyMap: Record<string, number> = {};
    
    // Build frequency map
    for (const char of str) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }
    
    // Find first non-repeating character
    for (const char of str) {
        if (frequencyMap[char] === 1) {
            return char;
        }
    }
    
    return null;
}

// Test cases
const testCases = [
    { input: "swiss", expected: "w" },
    { input: "aabb", expected: null },
    { input: "abcde", expected: "a" },
    { input: "hello world", expected: "h" },
    { input: "", expected: null },
    { input: "a", expected: "a" },
    { input: "aa", expected: null }
];

testCases.forEach(({ input, expected }) => {
    const result = firstNonRepeatingChar(input);
    console.log(`Input: "${input}" -> Output: ${result} (Expected: ${expected})`);
});
