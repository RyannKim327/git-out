const originalString = "Hello WORLD";
const lowerCaseString = originalString.toLowerCase();
console.log(lowerCaseString); // Output: "hello world"
const originalString: string = "TypeScript is AWESOME!";
const lowerCaseString: string = originalString.toLowerCase();
console.log(lowerCaseString); // Output: "typescript is awesome!"
function convertToLowerCase(input: string): string {
    return input.toLowerCase();
}

const result = convertToLowerCase("UPPERCASE TEXT");
console.log(result); // Output: "uppercase text"
// Optional chaining with nullish coalescing
const possiblyNullString: string | null = "Some TEXT";
const safeLowerCase = possiblyNullString?.toLowerCase() ?? "";

// Or with a type guard
function safeToLowerCase(input: string | null | undefined): string {
    if (input == null) return "";
    return input.toLowerCase();
}
const stringArray: string[] = ["APPLE", "BANANA", "CHERRY"];
const lowerCaseArray = stringArray.map(str => str.toLowerCase());
console.log(lowerCaseArray); // Output: ["apple", "banana", "cherry"]
