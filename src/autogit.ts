function firstNonRepeatingChar(str: string): string | null {
    const charCount = new Map<string, number>();
    
    // First pass: count character frequencies
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Second pass: find first character with count === 1
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null; // No non-repeating character found
}

// Example usage
console.log(firstNonRepeatingChar("typescript")); // "t"
console.log(firstNonRepeatingChar("programming")); // "p"
console.log(firstNonRepeatingChar("aabbcc")); // null
function firstNonRepeatingChar2(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // Count character frequencies
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
function firstNonRepeatingChar3(str: string): string | null {
    return str.split('').find((char, index, array) => 
        array.indexOf(char) === array.lastIndexOf(char)
    ) || null;
}
interface CharFrequency {
    [key: string]: {
        count: number;
        firstIndex: number;
    };
}

function firstNonRepeatingCharEnhanced(str: string): string | null {
    const frequency: CharFrequency = {};
    
    // Record frequency and first occurrence
    str.split('').forEach((char, index) => {
        if (frequency[char]) {
            frequency[char].count++;
        } else {
            frequency[char] = {
                count: 1,
                firstIndex: index
            };
        }
    });
    
    // Find character with count = 1 and lowest firstIndex
    let result: string | null = null;
    let lowestIndex = Infinity;
    
    for (const char in frequency) {
        if (frequency[char].count === 1 && frequency[char].firstIndex < lowestIndex) {
            lowestIndex = frequency[char].firstIndex;
            result = char;
        }
    }
    
    return result;
}
const firstNonRepeatingCharOneLiner = (str: string): string | null => 
    [...str].find((char) => str.indexOf(char) === str.lastIndexOf(char)) || null;
function firstNonRepeatingCharSafe(input: unknown): string | null {
    // Input validation
    if (typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    
    const str = input as string;
    
    if (str.length === 0) {
        return null;
    }
    
    const charCount = new Map<string, number>();
    
    // Count frequencies
    for (const char of str) {
        const currentCount = charCount.get(char) || 0;
        charCount.set(char, currentCount + 1);
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
    "typescript",
    "programming",
    "aabbcc",
    "hello world",
    "swiss",
    "",
    "a",
    "abacabad"
];

testCases.forEach(testCase => {
    console.log(`Input: "${testCase}" -> Output: "${firstNonRepeatingChar(testCase)}"`);
});
