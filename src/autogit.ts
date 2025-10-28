const mainString: string = "Hello TypeScript World";
const substring: string = "TypeScript";

// Check if substring exists
const containsSubstring: boolean = mainString.includes(substring);
console.log(containsSubstring); // true

// Case-sensitive check
const caseSensitiveCheck: boolean = mainString.includes("typescript");
console.log(caseSensitiveCheck); // false

// With optional position parameter
const fromPosition: boolean = mainString.includes("World", 15);
console.log(fromPosition); // true
const mainString: string = "Hello TypeScript World";
const substring: string = "TypeScript";

// Returns -1 if not found, otherwise returns the index
const containsSubstring: boolean = mainString.indexOf(substring) !== -1;
console.log(containsSubstring); // true

// You can also specify starting position
const fromPosition: boolean = mainString.indexOf("World", 10) !== -1;
console.log(fromPosition); // true
const mainString: string = "Hello TypeScript World";
const substring: string = "TypeScript";

// Case-sensitive search
const regex: RegExp = new RegExp(substring);
const containsSubstring: boolean = regex.test(mainString);
console.log(containsSubstring); // true

// Case-insensitive search
const caseInsensitiveRegex: RegExp = new RegExp("typescript", "i");
const caseInsensitiveCheck: boolean = caseInsensitiveRegex.test(mainString);
console.log(caseInsensitiveCheck); // true
const mainString: string = "Hello TypeScript World";
const substring: string = "TypeScript";

// Returns -1 if not found, otherwise returns the index
const containsSubstring: boolean = mainString.search(substring) !== -1;
console.log(containsSubstring); // true

// With regular expression
const regexSearch: boolean = mainString.search(/TypeScript/) !== -1;
console.log(regexSearch); // true
function containsSubstring(
  mainString: string, 
  substring: string, 
  caseSensitive: boolean = true
): boolean {
  if (caseSensitive) {
    return mainString.includes(substring);
  } else {
    return mainString.toLowerCase().includes(substring.toLowerCase());
  }
}

// Usage
const result1 = containsSubstring("Hello World", "hello"); // false (case-sensitive)
const result2 = containsSubstring("Hello World", "hello", false); // true (case-insensitive)
// Best practice
const hasSubstring = myString.includes("searchTerm");
