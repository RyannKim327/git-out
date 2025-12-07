function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

// Example usage
const original = "Hello, World!";
const reversed = reverseString(original);
console.log(reversed); // "!dlroW ,olleH"
function reverseString(str: string): string {
    return [...str].reverse().join('');
}

// Example usage
const reversed = reverseString("TypeScript");
console.log(reversed); // "tpircSepyT"
function reverseString(str: string): string {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Example usage
const reversed = reverseString("Reverse me");
console.log(reversed); // "em esreveR"
function reverseString(str: string): string {
    if (str === '') return '';
    return reverseString(str.substr(1)) + str.charAt(0);
}

// Example usage
const reversed = reverseString("Recursive");
console.log(reversed); // "evisruceR"
function reverseString(str: string): string {
    return str.split('').reduce((reversed, char) => char + reversed, '');
}

// Example usage
const reversed = reverseString("Functional");
console.log(reversed); // "lanoitcnuF"
function reverseString(input: string): string {
    // Handle null/undefined gracefully
    if (input == null) return '';
    
    return input.split('').reverse().join('');
}

// Test cases
const testCases = [
    "Hello World",
    "",
    "a",
    "12345",
    "racecar"
];

testCases.forEach(test => {
    console.log(`Original: "${test}" -> Reversed: "${reverseString(test)}"`);
});
