const mainString: string = "Hello, TypeScript World!";
const substring: string = "TypeScript";

if (mainString.includes(substring)) {
    console.log("Substring found!");
} else {
    console.log("Substring not found.");
}
const mainString: string = "Hello, TypeScript World!";
const substring: string = "TypeScript";

if (mainString.indexOf(substring) !== -1) {
    console.log("Substring found!");
} else {
    console.log("Substring not found.");
}
const mainString: string = "Hello, TypeScript World!";
const substring: string = "TypeScript";

if (mainString.search(substring) !== -1) {
    console.log("Substring found!");
} else {
    console.log("Substring not found.");
}
const mainString: string = "Hello, TypeScript World!";
const pattern: RegExp = /TypeScript/i; // 'i' flag for case-insensitive

if (pattern.test(mainString)) {
    console.log("Pattern found!");
} else {
    console.log("Pattern not found.");
}
// Using includes() with toLowerCase()
const mainString: string = "Hello, TypeScript World!";
const substring: string = "typescript";

if (mainString.toLowerCase().includes(substring.toLowerCase())) {
    console.log("Substring found (case-insensitive)!");
}

// Using regex with 'i' flag
const pattern: RegExp = /typescript/i;
if (pattern.test(mainString)) {
    console.log("Substring found (case-insensitive)!");
}
function containsSubstring(mainString: string, substring: string, caseSensitive: boolean = true): boolean {
    if (caseSensitive) {
        return mainString.includes(substring);
    } else {
        return mainString.toLowerCase().includes(substring.toLowerCase());
    }
}

// Usage
const result = containsSubstring("Hello World", "hello", false); // true
console.log(result);
