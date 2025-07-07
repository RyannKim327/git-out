function reverseWords(input: string): string {
    // Split the string into words by whitespace (space, tab, etc.)
    const words = input.trim().split(/\s+/);

    // Reverse the order of the words
    const reversedWords = words.reverse();

    // Join the reversed array of words back into a single string
    return reversedWords.join(' ');
}

// Example usage
const originalString = "Hello world this is TypeScript";
const reversedString = reverseWords(originalString);

console.log(reversedString); // Output: "TypeScript is this world Hello"
console.log(reverseWords("   Hello   world   ")); // Output: "world Hello"
console.log(reverseWords(""));                     // Output: ""
console.log(reverseWords("singleWord"));           // Output: "singleWord"
console.log(reverseWords("  a b c d e f "));      // Output: "f e d c b a"
