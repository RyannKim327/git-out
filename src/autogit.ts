const originalString: string = "Hello World Type Script";
const noSpaces: string = originalString.replace(/\s/g, '');
console.log(noSpaces); // "HelloWorldTypeScript"
const stringWithSpaces: string = "Remove all spaces from this string";
const result: string = stringWithSpaces.replace(/ /g, '');
console.log(result); // "Removeallspacesfromthisstring"
const stringWithWhitespace: string = "Hello\tWorld\nType Script";
const cleaned: string = stringWithWhitespace.replace(/\s+/g, '');
console.log(cleaned); // "HelloWorldTypeScript"
const text: string = "Split and join method";
const noSpaces: string = text.split(' ').join('');
console.log(noSpaces); // "Splitandjoinmethod"

// For all whitespace characters
const textWithWhitespace: string = "Hello\tWorld\nTest";
const cleaned: string = textWithWhitespace.split(/\s+/).join('');
console.log(cleaned); // "HelloWorldTest"
// Function to remove all spaces
function removeSpaces(text: string): string {
    return text.replace(/\s/g, '');
}

// Function to remove only regular spaces (not tabs/newlines)
function removeRegularSpaces(text: string): string {
    return text.replace(/ /g, '');
}

// Usage
const example: string = "Type Script Example";
console.log(removeSpaces(example)); // "TypeScriptExample"
console.log(removeRegularSpaces(example)); // "TypeScriptExample"
