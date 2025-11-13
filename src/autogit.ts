function reverseWords(str: string): string {
    return str
        .split(' ')                    // Split into array of words
        .reverse()                     // Reverse the array
        .join(' ');                    // Join back into string
}

// Example usage
const input = "Hello World TypeScript";
const reversed = reverseWords(input);
console.log(reversed); // "TypeScript World Hello"
function reverseWordsWithRegEx(str: string): string {
    return str
        .split(/\s+/)                 // Split on one or more whitespace characters
        .reverse()
        .join(' ');
}

// Example usage
const text = "Hello   World    TypeScript";
const result = reverseWordsWithRegEx(text);
console.log(result); // "TypeScript World Hello"
function reverseWordsSafe(str: string): string {
    if (!str.trim()) return str;       // Handle empty or whitespace-only strings
    
    return str
        .trim()                        // Remove leading/trailing whitespace
        .split(/\s+/)                  // Split on one or more whitespace
        .reverse()
        .join(' ');
}

// Example usage
console.log(reverseWordsSafe(""));               // ""
console.log(reverseWordsSafe("  "));             // "  "
console.log(reverseWordsSafe("Hello"));          // "Hello"
console.log(reverseWordsSafe("Hello World"));    // "World Hello"
function reverseWordsReduce(str: string): string {
    const words = str.trim().split(/\s+/);
    return words.reduce((acc, word, index) => {
        return index === 0 ? word : `${word} ${acc}`;
    }, '');
}

// Example usage
console.log(reverseWordsReduce("Hello World TypeScript")); // "TypeScript World Hello"
function reverseWordsManual(str: string): string {
    let words: string[] = [];
    let currentWord = '';
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            if (currentWord) {
                words.push(currentWord);
                currentWord = '';
            }
        } else {
            currentWord += str[i];
        }
    }
    
    // Don't forget the last word
    if (currentWord) {
        words.push(currentWord);
    }
    
    return words.reverse().join(' ');
}

// Example usage
console.log(reverseWordsManual("Hello World TypeScript")); // "TypeScript World Hello"
function reverseWords(str: string): string {
    // Input validation
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    // Handle edge cases
    if (str.trim().length === 0) return str;
    
    // Main logic
    return str
        .trim()
        .split(/\s+/)
        .reverse()
        .join(' ');
}

// Test cases
const testCases = [
    "Hello World TypeScript",
    "  Multiple   Spaces   Here  ",
    "SingleWord",
    "",
    "   ",
    "a b c d e"
];

testCases.forEach(test => {
    console.log(`"${test}" -> "${reverseWords(test)}"`);
});
"Hello World TypeScript" -> "TypeScript World Hello"
"  Multiple   Spaces   Here  " -> "Here Spaces Multiple"
"SingleWord" -> "SingleWord"
"" -> ""
"   " -> "   "
"a b c d e" -> "e d c b a"
