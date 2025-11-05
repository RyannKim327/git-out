const originalString: string = "Hello WORLD!";
const lowerCaseString: string = originalString.toLowerCase();

console.log(lowerCaseString); // "hello world!"
const text: string = "İSTANBUL";
const lowerCaseText: string = text.toLocaleLowerCase('tr-TR');

console.log(lowerCaseText); // "istanbul" (handles Turkish 'i' correctly)
const message: string = "TypeScript";
const lowerCaseMessage: string = `${message}`.toLowerCase();

console.log(lowerCaseMessage); // "typescript"
function toLowerCase(str: string): string {
    return str.toLowerCase();
}

const result: string = toLowerCase("HELLO TypeScript");
console.log(result); // "hello typescript"
// Case-insensitive comparison
const input: string = "Admin";
const isAdmin: boolean = input.toLowerCase() === "admin";

// Processing user input
const processInput = (userInput: string): string => {
    return userInput.toLowerCase().trim();
};

// Array of strings to lowercase
const names: string[] = ["ALICE", "BOB", "CHARLIE"];
const lowerCaseNames: string[] = names.map(name => name.toLowerCase());

console.log(lowerCaseNames); // ["alice", "bob", "charlie"]
