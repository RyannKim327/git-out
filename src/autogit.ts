function removeSpaces(input: string): string {
    return input.replace(/\s+/g, ''); // Removes all types of whitespace
}

// Example usage:
const originalString = "Hello World! How are you?";
const stringWithoutSpaces = removeSpaces(originalString);
console.log(stringWithoutSpaces); // Output: "HelloWorld!Howareyou?"
function removeSpaces(input: string): string {
    return input.split(' ').join(''); // Removes spaces only
}

// Example usage:
const originalString = "Hello World! How are you?";
const stringWithoutSpaces = removeSpaces(originalString);
console.log(stringWithoutSpaces); // Output: "HelloWorld!Howareyou?"
