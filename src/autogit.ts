function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

// Example usage
const original = "Hello World";
const reversed = reverseString(original);
console.log(reversed); // "dlroW olleH"
function reverseString(str: string): string {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
function reverseString(str: string): string {
    if (str === '') return '';
    return reverseString(str.substr(1)) + str.charAt(0);
}
function reverseString(str: string): string {
    return Array.from(str).reverse().join('');
}

// Better for emojis and special characters
const withEmoji = "Hello 🌍";
console.log(reverseString(withEmoji)); // "🌍 olleH"
function reverseString(str: string): string {
    return str.split('').reduce((reversed, char) => char + reversed, '');
}
function reverseString(input: string): string {
    // Handle null/undefined with type guard
    if (!input) return '';
    
    return input.split('').reverse().join('');
}

// Test cases
const test1 = reverseString("TypeScript"); // "tpircSepyT"
const test2 = reverseString(""); // ""
const test3 = reverseString("a"); // "a"
function safeReverseString(str: string | null | undefined): string {
    if (!str) return '';
    return Array.from(str).reverse().join('');
}

// Works with potentially null values
const result = safeReverseString(somePossibleNullValue);
