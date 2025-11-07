function reverseWords(str: string): string {
    return str.trim().split(/\s+/).reverse().join(' ');
}

// Example Usage:
const input = "Hello World   TypeScript";
const reversed = reverseWords(input); // "TypeScript World Hello"
