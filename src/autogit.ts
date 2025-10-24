function firstNonRepeatingChar(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // First pass: count frequency of each character
    for (const char of str) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Second pass: find first character with count = 1
    for (const char of str) {
        if (charCount[char] === 1) {
            return char;
        }
    }
    
    return null; // No non-repeating character found
}

// Example usage
console.log(firstNonRepeatingChar("typescript")); // "t"
console.log(firstNonRepeatingChar("aabbcc"));     // null
console.log(firstNonRepeatingChar("abcab"));      // "c"
function firstNonRepeatingCharMap(str: string): string | null {
    const charCount = new Map<string, number>();
    
    // Count frequency
    for (const char of str) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Find first non-repeating
    for (const char of str) {
        if (charCount.get(char) === 1) {
            return char;
        }
    }
    
    return null;
}
function firstNonRepeatingCharFunctional(str: string): string | null {
    const charArray = str.split('');
    
    return charArray.find((char, index, array) => 
        array.indexOf(char) === array.lastIndexOf(char)
    ) || null;
}
function firstNonRepeatingCharCaseSensitive(str: string): string | null {
    const charCount: { [key: string]: number } = {};
    
    // Count frequency (case-sensitive)
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
    const charCount: { [key: string]: number } = {};
    
    // Count frequency (case-insensitive)
    for (const char of lowerStr) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Find first non-repeating in original string
    for (let i = 0; i < str.length; i++) {
        if (charCount[lowerStr[i]] === 1) {
            return str[i];
        }
    }
    
    return null;
}
type NonRepeatingResult = string | null;

class CharacterFinder {
    static firstNonRepeating(str: string): NonRepeatingResult {
        if (str.length === 0) return null;
        
        const charCount = new Map<string, number>();
        
        // Count occurrences
        for (const char of str) {
            charCount.set(char, (charCount.get(char) || 0) + 1);
        }
        
        // Find first unique character
        for (const char of str) {
            if (charCount.get(char) === 1) {
                return char;
            }
        }
        
        return null;
    }
}

// Test the function
const testStrings = [
    "typescript",
    "programming",
    "aabbcc",
    "abcab",
    "hello world",
    ""
];

testStrings.forEach(str => {
    const result = CharacterFinder.firstNonRepeating(str);
    console.log(`"${str}" -> ${result}`);
});
