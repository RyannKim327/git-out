// Example string
let originalString: string = "Hello, World!";

// Convert to lowercase
let lowerCaseString: string = originalString.toLowerCase();

// Output the result
console.log(lowerCaseString); // Output: "hello, world!"
function convertToLowerCase(input: string): string {
    return input.toLowerCase();
}

// Usage
const myString: string = "TypeScript Is Awesome!";
const lowerCasedString: string = convertToLowerCase(myString);
console.log(lowerCasedString); // Output: "typescript is awesome!"
