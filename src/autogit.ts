function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

// Usage
const original = "Hello World";
const reversed = reverseString(original);
console.log(reversed); // "dlroW olleH"
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
    return str.split('').reduce((reversed, char) => char + reversed, '');
}

// Usage
const reversed = reverseString("Reverse");
console.log(reversed); // "esreveR"
function reverseString(str: string): string {
    if (str === '') return '';
    return reverseString(str.substr(1)) + str.charAt(0);
}

// Usage
const reversed = reverseString("Recursion");
console.log(reversed); // "noisruceR"
function reverseString(str: string): string {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    return str.split('').reverse().join('');
}

// Test with various inputs
console.log(reverseString("")); // ""
console.log(reverseString("a")); // "a"
console.log(reverseString("ab")); // "ba"
console.log(reverseString("Hello 👋")); // "👋 olleH"
const reverseString = (str: string): string => 
    str.split('').reverse().join('');

// Usage
const result = reverseString("Arrow Function");
console.log(result); // "noitcnuF worrA"
