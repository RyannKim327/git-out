function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

// Usage
const original = "Hello, World!";
const reversed = reverseString(original);
console.log(reversed); // "!dlroW ,olleH"
function reverseString(str: string): string {
    return [...str].reverse().join('');
}

// Usage
const reversed = reverseString("TypeScript");
console.log(reversed); // "tpircSepyT"
function reverseString(str: string): string {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Usage
const reversed = reverseString("Hello");
console.log(reversed); // "olleH"
function reverseString(str: string): string {
    if (str === '') {
        return '';
    }
    return reverseString(str.substr(1)) + str.charAt(0);
}

// Usage
const reversed = reverseString("Recursion");
console.log(reversed); // "noisruceR"
function reverseString(str: string): string {
    return str.split('').reduce((reversed, char) => char + reversed, '');
}

// Usage
const reversed = reverseString("Reduce");
console.log(reversed); // "ecudeR"
// Most efficient and readable approach
const reverseString = (str: string): string => {
    return str.split('').reverse().join('');
};

// Test with different string types
const test1: string = "Hello";
const test2: string = "12345";
const test3: string = "🌍🚀"; // Works with emojis too!

console.log(reverseString(test1)); // "olleH"
console.log(reverseString(test2)); // "54321"
console.log(reverseString(test3)); // "🚀🌍"
