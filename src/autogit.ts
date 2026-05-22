function reverseWords(text: string): string {
    // Split on any amount of whitespace, strip leading/trailing spaces
    const words = text.trim().split(/\s+/);
    // Reverse and join with a single space
    return words.reverse().join(' ');
}

console.log(reverseWords("Hello world from TypeScript")); // "TypeScript from world Hello"
