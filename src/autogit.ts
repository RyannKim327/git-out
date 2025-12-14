function firstNonRepeatingChar(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // First pass: count character occurrences
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Second pass: find first character with count = 1
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null; // Return null if no non-repeating character found
}

// Usage
const result = firstNonRepeatingChar("swiss"); // Returns "w"
console.log(result);
function firstNonRepeatingCharMap(str: string): string | null {
    const charMap = new Map<string, number>();
    
    // Count occurrences
    for (const char of str) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Find first non-repeating character
    for (const char of str) {
        if (charMap.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingCharOnePass(str: string): string | null {
    const charMap = new Map<string, { count: number; index: number }>();
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (charMap.has(char)) {
            charMap.get(char)!.count++;
        } else {
            charMap.set(char, { count: 1, index: i });
        }
    }
    
    let result: string | null = null;
    let minIndex = Infinity;
    
    // Find character with count = 1 and smallest index
    for (const [char, data] of charMap) {
        if (data.count === 1 && data.index < minIndex) {
            minIndex = data.index;
            result = char;
        }
    }
    
    return result;
}
function firstNonRepeatingCharFunctional(str: string): string | null {
    const charCount = str.split('').reduce((acc: { [key: string]: number }, char) => {
        acc[char] = (acc[char] || 0) + 1;
        return acc;
    }, {});
    
    const result = str.split('').find(char => charCount[char] === 1);
    return result || null;
}
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
const testCases = [
    { input: "swiss", expected: "w" },
    { input: "hello", expected: "h" },
    { input: "aabbcc", expected: null },
    { input: "typescript", expected: "t" },
    { input: "", expected: null }
];

testCases.forEach(({ input, expected }) => {
    const result = firstNonRepeatingChar(input);
    console.log(`Input: "${input}" -> Output: ${result}, Expected: ${expected}`);
});
