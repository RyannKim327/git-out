const str = "Hello World with spaces";
const noSpaces = str.replace(/\s/g, '');

console.log(noSpaces); // "HelloWorldwithspaces"
const str = "Hello World with spaces";
const noSpaces = str.replaceAll(' ', '');

console.log(noSpaces); // "HelloWorldwithspaces"
function removeSpaces(str: string): string {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            result += str[i];
        }
    }
    return result;
}

const str = "Hello World with spaces";
console.log(removeSpaces(str)); // "HelloWorldwithspaces"
const str: string = "Hello World";
const noSpaces: string = str.replace(/\s/g, ''); // TypeScript knows this is a string
