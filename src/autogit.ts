const text: string = "Hello WORLD!";
const lowercaseText: string = text.toLowerCase();
console.log(lowercaseText); // Output: "hello world!"
function toLowerCaseSafe(input: string): string {
    return input.toLowerCase();
}

const result = toLowerCaseSafe("TYPE Script"); // "type script"
function safeToLowerCase(input: string | null | undefined): string {
    if (input == null) {
        return "";
    }
    return input.toLowerCase();
}

// Usage
const text1 = safeToLowerCase("HELLO"); // "hello"
const text2 = safeToLowerCase(null); // ""
const text3 = safeToLowerCase(undefined); // ""
const name: string = "JOHN DOE";
const greeting = `Hello, ${name.toLowerCase()}!`;
console.log(greeting); // "Hello, john doe!"
const names: string[] = ["ALICE", "BOB", "CHARLIE"];
const lowercaseNames = names.map(name => name.toLowerCase());
console.log(lowercaseNames); // ["alice", "bob", "charlie"]
