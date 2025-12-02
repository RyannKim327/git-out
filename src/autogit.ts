const originalString: string = "Hello World Type Script";
const noSpaces: string = originalString.replace(/\s/g, '');

console.log(noSpaces); // Output: "HelloWorldTypeScript"
const originalString: string = "Hello World Type Script";
const noSpaces: string = originalString.replaceAll(' ', '');

console.log(noSpaces); // Output: "HelloWorldTypeScript"
const originalString: string = "Hello World Type Script";
const noSpaces: string = originalString.split(' ').join('');

console.log(noSpaces); // Output: "HelloWorldTypeScript"
function removeSpaces(input: string): string {
    let result = '';
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== ' ') {
            result += input[i];
        }
    }
    return result;
}

const originalString: string = "Hello World Type Script";
const noSpaces: string = removeSpaces(originalString);

console.log(noSpaces); // Output: "HelloWorldTypeScript"
const stringWithWhitespace: string = "Hello\tWorld\nType Script";
const cleaned: string = stringWithWhitespace.replace(/\s/g, '');

console.log(cleaned); // Output: "HelloWorldTypeScript"
const stringWithSpaces: string = "Hello World Type Script";
const cleaned: string = stringWithSpaces.replaceAll(' ', '');

console.log(cleaned); // Output: "HelloWorldTypeScript"
