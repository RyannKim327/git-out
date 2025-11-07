const text: string = "Hello WORLD";
const lowercaseText: string = text.toLowerCase();
console.log(lowercaseText); // Output: "hello world"
const stringArray: string[] = ["Apple", "BANANA", "Cherry"];
const lowercaseArray: string[] = stringArray.map(str => str.toLowerCase());
console.log(lowercaseArray); // Output: ["apple", "banana", "cherry"]
function safeToLowercase(text: string | null | undefined): string {
    return text?.toLowerCase() || '';
}

const result = safeToLowercase("TypeScript"); // "typescript"
const result2 = safeToLowercase(null); // ""
const name = "JOHN DOE";
const greeting = `Hello ${name.toLowerCase()}`;
console.log(greeting); // Output: "Hello john doe"
interface User {
    name: string;
    email: string;
}

const user: User = { name: "ALICE", email: "ALICE@EXAMPLE.COM" };
const normalizedUser: User = {
    name: user.name.toLowerCase(),
    email: user.email.toLowerCase()
};
