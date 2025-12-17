const originalString: string = "Hello WORLD";
const lowerCaseString: string = originalString.toLowerCase();

console.log(lowerCaseString); // Output: "hello world"
const originalString: string = "İstanbul";
const lowerCaseString: string = originalString.toLocaleLowerCase('tr-TR');

console.log(lowerCaseString); // Output: "istanbul" (Turkish locale)
const stringArray: string[] = ["Apple", "BANANA", "Cherry"];
const lowerCaseArray: string[] = stringArray.map(str => str.toLowerCase());

console.log(lowerCaseArray); // Output: ["apple", "banana", "cherry"]
function toLowerCase(input: string): string {
    return input.toLowerCase();
}

const result = toLowerCase("TypeScript IS Awesome");
console.log(result); // Output: "typescript is awesome"
function convertToLower(input: string | null | undefined): string {
    if (!input) return "";
    return input.toLowerCase();
}

console.log(convertToLower("HELLO")); // "hello"
console.log(convertToLower(null));    // ""
