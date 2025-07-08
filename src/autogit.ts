function removeSpaces(input: string): string {
    return input.replace(/\s+/g, '');
}

// Example usage:
const originalString = "Hello, how are you?";
const stringWithoutSpaces = removeSpaces(originalString);
console.log(stringWithoutSpaces); // Output: "Hello,howareyou?"
function removeSpacesOnly(input: string): string {
    return input.replace(/ /g, '');
}
