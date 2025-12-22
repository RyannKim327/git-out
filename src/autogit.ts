const originalString = "Hello WORLD";
const lowercaseString = originalString.toLowerCase();
console.log(lowercaseString); // Output: "hello world"
const text: string = "TypeScript IS Awesome";
const lowerText: string = text.toLowerCase();
console.log(lowerText); // Output: "typescript is awesome"
function convertToLowercase(input: string): string {
    return input.toLowerCase();
}

const result = convertToLowercase("HELLO TypeScript");
console.log(result); // Output: "hello typescript"
// Using optional chaining and nullish coalescing
const possiblyNull: string | null = "HELLO";
const safeLowercase = possiblyNull?.toLowerCase() ?? "";

// Or with a type guard
function safeToLowerCase(input: string | null | undefined): string {
    if (input == null) return "";
    return input.toLowerCase();
}
const germanText = "STRASSE"; // German for "street"
const lowercaseGerman = germanText.toLocaleLowerCase('de-DE');
console.log(lowercaseGerman); // Output: "strasse"
