function reverseWords(sentence: string): string {
    return sentence.split(' ').reverse().join(' ');
}

// Example usage
const original = "Hello World TypeScript";
const reversed = reverseWords(original);
console.log(reversed); // "TypeScript World Hello"
function reverseWords(sentence: string): string {
    return sentence
        .trim()
        .split(' ')
        .filter(word => word.length > 0) // Remove empty strings from multiple spaces
        .reverse()
        .join(' ');
}

// Example with multiple spaces
const text = "  Hello   World  TypeScript  ";
console.log(reverseWords(text)); // "TypeScript World Hello"
function reverseWords(sentence: string): string {
    return sentence
        .split(/\s+/) // Split on one or more whitespace characters
        .filter(word => word.length > 0)
        .reverse()
        .join(' ');
}
function reverseWords(sentence: string): string {
    const words: string[] = [];
    let currentWord = '';
    
    for (let i = 0; i < sentence.length; i++) {
        if (sentence[i] === ' ') {
            if (currentWord.length > 0) {
                words.push(currentWord);
                currentWord = '';
            }
        } else {
            currentWord += sentence[i];
        }
    }
    
    // Don't forget the last word
    if (currentWord.length > 0) {
        words.push(currentWord);
    }
    
    return words.reverse().join(' ');
}
const reverseWords = (sentence: string): string => 
    sentence.trim().split(/\s+/).reverse().join(' ');

// Usage
console.log(reverseWords("Learning TypeScript is fun")); // "fun is TypeScript Learning"
function reverseWords(sentence: string): string {
    // Input validation
    if (typeof sentence !== 'string') {
        throw new Error('Input must be a string');
    }
    
    if (sentence.trim().length === 0) {
        return sentence;
    }
    
    return sentence
        .trim()
        .split(/\s+/)
        .reverse()
        .join(' ');
}

// Test cases
const testCases = [
    "Hello World",
    "TypeScript is awesome",
    "  Multiple   spaces   here  ",
    "SingleWord",
    "",
    "   "
];

testCases.forEach(test => {
    console.log(`"${test}" -> "${reverseWords(test)}"`);
});
"Hello World" -> "World Hello"
"TypeScript is awesome" -> "awesome is TypeScript"
"  Multiple   spaces   here  " -> "here spaces Multiple"
"SingleWord" -> "SingleWord"
"" -> ""
"   " -> ""
