const stringWithSpaces: string = "Hello World TypeScript";
const stringWithoutSpaces: string = stringWithSpaces.replace(/\s/g, '');

console.log(stringWithoutSpaces); // Output: "HelloWorldTypeScript"
const stringWithSpaces: string = "Hello World TypeScript";
const stringWithoutSpaces: string = stringWithSpaces.replaceAll(' ', '');

console.log(stringWithoutSpaces); // Output: "HelloWorldTypeScript"
const stringWithSpaces: string = "Hello World TypeScript";
const stringWithoutSpaces: string = stringWithSpaces.split(' ').join('');

console.log(stringWithoutSpaces); // Output: "HelloWorldTypeScript"
function removeSpaces(input: string): string {
    let result: string = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== ' ') {
            result += input[i];
        }
    }
    return result;
}

const stringWithSpaces: string = "Hello World TypeScript";
const stringWithoutSpaces: string = removeSpaces(stringWithSpaces);

console.log(stringWithoutSpaces); // Output: "HelloWorldTypeScript"
// Remove all whitespace (spaces, tabs, newlines)
const cleanString1: string = "Hello\tWorld\nTypeScript".replace(/\s/g, '');

// Remove only regular spaces
const cleanString2: string = "Hello World TypeScript".replaceAll(' ', '');
