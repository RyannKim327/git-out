const stringWithSpaces = "Hello World Example";
const stringWithoutSpaces = stringWithSpaces.replace(/\s/g, '');
console.log(stringWithoutSpaces); // Output: "HelloWorldExample"
const stringWithSpaces = "Hello World Example";
const stringWithoutSpaces = stringWithSpaces.split(' ').join('');
console.log(stringWithoutSpaces); // Output: "HelloWorldExample"
const stringWithSpaces = "Hello World Example";
const stringWithoutSpaces = stringWithSpaces.replaceAll(' ', '');
console.log(stringWithoutSpaces); // Output: "HelloWorldExample"
function removeAllSpaces(input: string): string {
    return input.replace(/\s/g, '');
}

// Usage
const result = removeAllSpaces("Type Script Example");
console.log(result); // Output: "TypeScriptExample"
