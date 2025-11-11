function reverseWords(str: string): string {
    // Trim whitespace and split into words (handles multiple spaces)
    const words = str.trim().split(/\s+/);
    // Reverse the array of words and join with single spaces
    return words.reverse().join(' ');
}
console.log(reverseWords('Hello World'));           // "World Hello"
console.log(reverseWords('  TypeScript is great ')); // "great is TypeScript"
console.log(reverseWords('Single'));                // "Single"
