// Remove all space characters
const stringWithoutSpaces = yourString.replace(/ /g, '');

// Example usage:
const original = "Hello World! This is a test.";
const result = original.replace(/ /g, ''); 
// Result: "HelloWorld!Thisisatest."
function removeSpaces(input: string): string {
    return input.replace(/ /g, '');
}

// Usage
const spacedString = "Type Script is Awesome!";
const compactString = removeSpaces(spacedString);
console.log(compactString); // Output: "TypeScriptisAwesome!"
