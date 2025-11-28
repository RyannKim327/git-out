const mainString: string = "Hello, TypeScript!";
const substring: string = "Type";

// Check if substring exists
const contains: boolean = mainString.includes(substring); 

console.log(contains); // Output: true
if (mainString.indexOf(substring) !== -1) {
  console.log("Substring found!");
}
// Case-sensitive search
const regex = /Type/;
const found: boolean = regex.test(mainString); // true

// Case-insensitive search
const caseInsensitiveRegex = /type/i;
const foundCaseInsensitive: boolean = caseInsensitiveRegex.test(mainString); // true
function containsSubstring(mainStr: string, subStr: string): boolean {
  return mainStr.includes(subStr);
}

// Usage
console.log(containsSubstring("TypeScript is awesome", "is")); // true
