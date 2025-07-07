function reverseWords(input: string): string {
    return input.split(' ').reverse().join(' ');
}

// Example usage
const originalString = "Hello World This Is TypeScript";
const reversedString = reverseWords(originalString);
console.log(reversedString); // Output: "TypeScript Is This World Hello"
function reverseWords(input: string): string {
    return input
        .trim() // Remove leading and trailing spaces
        .split(/\s+/) // Split by one or more whitespace characters
        .reverse() // Reverse the array of words
        .join(' '); // Join them back into a string
}

// Example usage
const originalString = "   Hello    World   This Is TypeScript   ";
const reversedString = reverseWords(originalString);
console.log(reversedString); // Output: "TypeScript Is This World Hello"
