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
const result = reverseString("TypeScript");
console.log(result); // "tpircSepyT"
function reverseString(str: string): string {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}

// Usage
console.log(reverseString("Reverse")); // "esreveR"
function reverseString(str: string): string {
    if (str === '') return '';
    return reverseString(str.substr(1)) + str.charAt(0);
}

// Usage
console.log(reverseString("Recursion")); // "noisruceR"
const reverseString = (str: string): string => str.split('').reverse().join('');

// Usage
console.log(reverseString("Arrow")); // "worrA"
function reverseString(str: string): string {
    return [...str].reverse().join('');
}

// This handles emojis correctly
console.log(reverseString("Hello 👋 World")); // "dlroW 👋 olleH"
