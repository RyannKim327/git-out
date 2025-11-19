function reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
}

// Example usage
const original = "Hello World TypeScript";
const reversed = reverseWords(original);
console.log(reversed); // "TypeScript World Hello"
function reverseWordsAdvanced(str: string): string {
    // Split on any whitespace, filter out empty strings
    const words = str.trim().split(/\s+/).filter(word => word.length > 0);
    return words.reverse().join(' ');
}

// Examples
console.log(reverseWordsAdvanced("  Hello   World  ")); // "World Hello"
console.log(reverseWordsAdvanced("One")); // "One"
function reverseWordsManual(str: string): string {
    const words = str.trim().split(/\s+/);
    let reversed = '';
    
    for (let i = words.length - 1; i >= 0; i--) {
        reversed += words[i];
        if (i > 0) reversed += ' ';
    }
    
    return reversed;
}
class StringUtils {
    static reverseWords(str: string): string {
        return str.split(/\s+/).reverse().join(' ').trim();
    }
}

// Usage
const result = StringUtils.reverseWords("TypeScript is awesome");
console.log(result); // "awesome is TypeScript"
function reverseWordsFunctional(str: string): string {
    return str
        .split(' ')
        .filter(word => word !== '')
        .reduce((acc, word) => [word, ...acc], [] as string[])
        .join(' ');
}
function reverseWords(str: string): string {
    return str.split(/\s+/).reverse().join(' ').trim();
}

// Test cases
const testCases = [
    "Hello World",
    "TypeScript is great",
    "  Multiple   spaces  ",
    "SingleWord",
    ""
];

testCases.forEach(test => {
    console.log(`Original: "${test}" -> Reversed: "${reverseWords(test)}"`);
});
