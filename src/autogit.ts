function reverseWords(str: string): string {
    return str.split(' ').reverse().join(' ');
}

// Example usage
const original = "Hello World TypeScript";
const reversed = reverseWords(original);
console.log(reversed); // "TypeScript World Hello"
function reverseWordsAdvanced(str: string): string {
    return str.trim().split(/\s+/).reverse().join(' ');
}

// Example usage
const complexString = "  Hello   World  TypeScript  ";
const reversedAdvanced = reverseWordsAdvanced(complexString);
console.log(reversedAdvanced); // "TypeScript World Hello"
function reverseWordsRegex(str: string): string {
    return str.match(/\S+/g)?.reverse().join(' ') || '';
}

// Example usage
const withExtraSpaces = "   Multiple    spaces   here   ";
const reversedRegex = reverseWordsRegex(withExtraSpaces);
console.log(reversedRegex); // "here spaces Multiple"
function reverseWordsFunctional(str: string): string {
    return str.split(' ')
              .filter(word => word.length > 0)
              .reverse()
              .join(' ');
}
function reverseWords(str: string): string {
    // Handle null/undefined input
    if (!str) return '';
    
    // Split, reverse, and join
    return str.trim().split(/\s+/).reverse().join(' ');
}

// Test cases
const testCases = [
    "Hello World",
    "TypeScript is awesome",
    "   Leading and trailing spaces   ",
    "Multiple    spaces",
    "",
    "SingleWord"
];

testCases.forEach(test => {
    console.log(`Original: "${test}"`);
    console.log(`Reversed: "${reverseWords(test)}"`);
    console.log('---');
});
