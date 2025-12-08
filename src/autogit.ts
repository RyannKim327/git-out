const originalString = "Hello WORLD";
const lowerCaseString = originalString.toLowerCase();
console.log(lowerCaseString); // Output: "hello world"
const text: string = "TypeScript IS Awesome";
const lowercaseText: string = text.toLowerCase();
console.log(lowercaseText); // Output: "typescript is awesome"
function convertToLowercase(input: string): string {
    return input.toLowerCase();
}

const result = convertToLowercase("HELLO TypeScript");
console.log(result); // Output: "hello typescript"
const strings: string[] = ["APPLE", "BANANA", "CHERRY"];
const lowercaseStrings = strings.map(str => str.toLowerCase());
console.log(lowercaseStrings); // Output: ["apple", "banana", "cherry"]
function caseInsensitiveCompare(str1: string, str2: string): boolean {
    return str1.toLowerCase() === str2.toLowerCase();
}

console.log(caseInsensitiveCompare("Hello", "HELLO")); // Output: true
function safeToLowerCase(input: string | null | undefined): string {
    if (input == null) return "";
    return input.toLowerCase();
}

console.log(safeToLowerCase("TEST")); // Output: "test"
console.log(safeToLowerCase(null));   // Output: ""
const name = "John DOE";
const greeting = `Hello, ${name.toLowerCase()}!`;
console.log(greeting); // Output: "Hello, john doe!"
