const originalString = "Hello WORLD";
const lowerCaseString = originalString.toLowerCase();
console.log(lowerCaseString); // "hello world"
const originalString = "İstanbul";
const lowerCaseString = originalString.toLocaleLowerCase('tr-TR');
console.log(lowerCaseString); // "istanbul" (handles Turkish-specific characters)
function convertToLowercase(input: string): string {
    return input.toLowerCase();
}

const result = convertToLowercase("TypeScript ROCKS!");
console.log(result); // "typescript rocks!"
function safeToLowercase(input: string | null | undefined): string {
    if (!input) return '';
    return input.toLowerCase();
}

console.log(safeToLowercase("HELLO")); // "hello"
console.log(safeToLowercase(null)); // ""
