function findFirstRepeatedChar(str: string): string | null {
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null; // No repeated character found
}

// Example usage
console.log(findFirstRepeatedChar("typescript")); // "t"
console.log(findFirstRepeatedChar("hello"));      // "l"
console.log(findFirstRepeatedChar("abc"));        // null
function findFirstRepeatedChar(str: string): string | null {
    const charCount: Record<string, number> = {};
    
    for (const char of str) {
        if (charCount[char]) {
            return char;
        }
        charCount[char] = 1;
    }
    
    return null;
}
function findFirstRepeatedChar(str: string): string | null {
    for (let i = 0; i < str.length; i++) {
        if (str.indexOf(str[i], i + 1) !== -1) {
            return str[i];
        }
    }
    return null;
}
function findFirstRepeatedChar(str: string): string | null {
    const result = str.split('').find((char, index) => 
        str.includes(char, index + 1)
    );
    return result || null;
}
function findFirstRepeatedChar(str: string): string | null {
    // Handle empty string
    if (str.length === 0) return null;
    
    const seen = new Set<string>();
    
    for (const char of str) {
        if (seen.has(char)) {
            return char;
        }
        seen.add(char);
    }
    
    return null;
}

// Test cases
const testCases = [
    { input: "typescript", expected: "t" },
    { input: "hello", expected: "l" },
    { input: "abc", expected: null },
    { input: "", expected: null },
    { input: "aabbcc", expected: "a" }
];

testCases.forEach(({ input, expected }) => {
    const result = findFirstRepeatedChar(input);
    console.log(`Input: "${input}" -> Result: ${result}, Expected: ${expected}`);
});
