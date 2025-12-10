const myString: string = "Hello WORLD";
const lowerCaseString: string = myString.toLowerCase();
console.log(lowerCaseString); // Output: "hello world"
function convertToLowerCase(input: string): string {
    return input.toLowerCase();
}

const result = convertToLowerCase("TypeScript ROCKS");
console.log(result); // Output: "typescript rocks"
function safeToLowerCase(input: string | null | undefined): string {
    if (input == null) {
        return ""; // or handle null/undefined case appropriately
    }
    return input.toLowerCase();
}

// Usage
console.log(safeToLowerCase("HELLO")); // "hello"
console.log(safeToLowerCase(null));    // ""
console.log(safeToLowerCase(undefined)); // ""
const possiblyNullString: string | null = "UPPERCASE";
const lowerCaseResult = possiblyNullString?.toLowerCase() || "";
console.log(lowerCaseResult); // "uppercase"
// Direct method call
console.log("HELLO TypeScript".toLowerCase()); // "hello typescript"

// In template literals
const name = "JOHN DOE";
console.log(`Hello ${name.toLowerCase()}`); // "Hello john doe"
const stringArray: string[] = ["APPLE", "BANANA", "CHERRY"];
const lowerCaseArray = stringArray.map(str => str.toLowerCase());
console.log(lowerCaseArray); // ["apple", "banana", "cherry"]
