const myString: string = "Hello World";
const lowercaseString: string = myString.toLowerCase();

console.log(lowercaseString); // "hello world"
function convertToLowerCase(input: string): string {
    return input.toLowerCase();
}

const result = convertToLowerCase("TypeScript"); // Type: string
console.log(result); // "typescript"
function safeToLowerCase(input: string | undefined | null): string {
    return input ? input.toLowerCase() : '';
}

// Or using optional chaining (if input might be undefined)
const result = input?.toLowerCase() || '';
// Convert user input for comparison
const userInput = "JOHN DOE";
const normalizedInput = userInput.toLowerCase(); // "john doe"

// Array of strings
const names: string[] = ["Alice", "BOB", "Charlie"];
const lowercaseNames = names.map(name => name.toLowerCase());

// Working with objects
interface User {
    name: string;
    email: string;
}

const user: User = { name: "Alice", email: "alice@example.com" };
const normalizedUser = {
    ...user,
    name: user.name.toLowerCase(),
    email: user.email.toLowerCase()
};
