const originalString = "HELLO World";
const lowerCaseString = originalString.toLowerCase();

console.log(lowerCaseString); // Output: "hello world"
function convertToLowerCase(input: string): string {
    return input.toLowerCase();
}

const result = convertToLowerCase("TypeScript ROCKS!");
console.log(result); // Output: "typescript rocks!"
// Safe conversion that handles potentially undefined values
function safeLowerCase(input: string | null | undefined): string {
    if (input == null) {
        return "";
    }
    return input.toLowerCase();
}

console.log(safeLowerCase("HELLO")); // "hello"
console.log(safeLowerCase(null));    // ""
console.log(safeLowerCase(undefined)); // ""
const possiblyNullString: string | null = getSomeString(); // hypothetical function
const lowerCase = possiblyNullString?.toLowerCase() ?? "";

// Or in a function
const toLowerSafe = (str: string | null | undefined): string => 
    str?.toLowerCase() ?? "";
// Use toLocaleLowerCase() for locale-specific conversion
const original = "İSTANBUL"; // Turkish dotted I
const lowerCase = original.toLocaleLowerCase('tr-TR'); // Turkish locale

console.log(lowerCase); // Output: "istanbul" (with appropriate locale handling)
