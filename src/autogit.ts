function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

// Usage
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

// Usage
const original = "Hello World";
const reversed = reverseString(original);
console.log(reversed); // "dlroW olleH"
function reverseString(str: string): string {
    if (str.length <= 1) {
        return str;
    }
    return reverseString(str.slice(1)) + str[0];
}

// Usage
const original = "Hello World";
const reversed = reverseString(original);
console.log(reversed); // "dlroW olleH"
const reverseString = (str: string): string => 
    [...str].reverse().join('');

// Usage
const reversed = reverseString("Hello World");
console.log(reversed); // "dlroW olleH"
