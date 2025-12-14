function reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
}

// Example usage
const original = "Hello World TypeScript";
const reversed = reverseWords(original);
console.log(reversed); // "TypeScript World Hello"
function reverseWordsRobust(str: string): string {
    // Split on one or more spaces to handle multiple spaces
    return str.trim().split(/\s+/).reverse().join(' ');
}

// Example usage
const text = "   Hello    World   TypeScript   ";
console.log(reverseWordsRobust(text)); // "TypeScript World Hello"
function reverseWordsRegex(str: string): string {
    // Match words (excluding punctuation from words)
    const words = str.match(/\b\w+\b/g) || [];
    return words.reverse().join(' ');
}

// Example usage
const sentence = "Hello, World! How are you?";
console.log(reverseWordsRegex(sentence)); // "you are How World Hello"
function reverseWordsPreservePunctuation(str: string): string {
    // Split on word boundaries to preserve punctuation
    const parts = str.split(/(\W+)/);
    const words = parts.filter(part => /\w+/.test(part));
    const nonWords = parts.filter(part => !/\w+/.test(part));
    
    let result = '';
    let wordIndex = words.length - 1;
    let nonWordIndex = 0;
    
    for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
            // Word position
            result += wordIndex >= 0 ? words[wordIndex--] : '';
        } else {
            // Non-word position (spaces, punctuation)
            result += nonWordIndex < nonWords.length ? nonWords[nonWordIndex++] : '';
        }
    }
    
    return result;
}

// Example usage
const textWithPunctuation = "Hello, World! How are you?";
console.log(reverseWordsPreservePunctuation(textWithPunctuation)); 
// "you, are! How World Hello?"
interface ReverseWordsOptions {
    preservePunctuation?: boolean;
    trimSpaces?: boolean;
}

function reverseWordsAdvanced(
    str: string, 
    options: ReverseWordsOptions = {}
): string {
    const { preservePunctuation = false, trimSpaces = true } = options;
    
    if (trimSpaces) {
        str = str.trim();
    }
    
    if (preservePunctuation) {
        return reverseWordsPreservePunctuation(str);
    } else {
        return str.split(/\s+/).reverse().join(' ');
    }
}

// Example usage
console.log(reverseWordsAdvanced("Hello World TypeScript")); 
// "TypeScript World Hello"

console.log(reverseWordsAdvanced("Hello, World! How are you?", { preservePunctuation: true }));
// "you, are! How World Hello?"
