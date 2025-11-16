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

// Better for Unicode characters like emojis
const withEmoji = "Hello 👋 World";
console.log(reverseString(withEmoji)); // "dlroW 👋 olleH"
function reverseString(str: string): string {
    return str.split('').reduce((reversed, char) => char + reversed, '');
}
function reverseString<T extends string>(str: T): string {
    return str.split('').reverse().join('');
}
