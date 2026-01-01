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
console.log(reverseString("TypeScript")); // "tpircSepyT"
function reverseString(str: string): string {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Usage
console.log(reverseString("Reverse me")); // "em esreveR"
function reverseString(str: string): string {
    if (str === '') {
        return '';
    }
    return reverseString(str.substring(1)) + str.charAt(0);
}

// Usage
console.log(reverseString("Recursive")); // "evisruceR"
function reverseString(str: string): string {
    return str.split('').reduce((reversed, char) => char + reversed, '');
}

// Usage
console.log(reverseString("Functional")); // "lanoitcnuF"
const reverseString = (str: string): string => [...str].reverse().join('');

// Usage
console.log(reverseString("Arrow function")); // "noitcnuF worrA"
function safeReverseString(str: string): string {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    return str.split('').reverse().join('');
}

// Usage with type safety
const input: string = "Safe reversing";
console.log(safeReverseString(input));
