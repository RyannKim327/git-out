function firstNonRepeatingChar(str: string): string | null {
    // Map to store character frequencies
    const charCount = new Map<string, number>();
    
    // First pass: count frequencies
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Second pass: find first character with frequency 1
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null; // No non-repeating character found
}

// Example usage
console.log(firstNonRepeatingChar("aabbccdef")); // "d"
console.log(firstNonRepeatingChar("aabc")); // "c"
console.log(firstNonRepeatingChar("aabbcc")); // null
function firstNonRepeatingChar(str: string): string | null {
    // Object to store character frequencies
    const charCount: { [key: string]: number } = {};
    
    // First pass: count frequencies
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Second pass: find first character with frequency 1
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null;
}

// Example usage
console.log(firstNonRepeatingChar("aabbccdef")); // "d"
function firstNonRepeatingChar(str: string): string | null {
    // Count frequencies using reduce
    const charCount = str.split('').reduce((acc, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {} as { [key: string]: number });
    
    // Find first non-repeating character
    return str.split('').find(char => charCount[char] === 1) || null;
}

// Example usage
console.log(firstNonRepeatingChar("aabbccdef")); // "d"
function firstNonRepeatingChar(str: string): string | null {
    const count = new Map();
    for (const char of str) count.set(char, (count.get(char) || 0) + 1);
    return str.split('').find(char => count.get(char) === 1) || null;
}
// Test function
function testFirstNonRepeating() {
    const tests = [
        "aabbccdef", // Expected: "d"
        "aabc",      // Expected: "c"
        "aabbcc",    // Expected: null
        "abc",       // Expected: "a"
        "",          // Expected: null
        "a",         // Expected: "a"
        "aa",        // Expected: null
    ];
    
    tests.forEach(test => {
        const result = firstNonRepeatingChar(test);
        console.log(`Input: "${test}" → Output: "${result}"`);
    });
}

testFirstNonRepeating();
