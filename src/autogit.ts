const str: string = "Hello, TypeScript World!";
const substring: string = "TypeScript";

if (str.includes(substring)) {
    console.log("Substring found!");
} else {
    console.log("Substring not found.");
}
const str: string = "Hello, TypeScript World!";
const substring: string = "TypeScript";

if (str.indexOf(substring) !== -1) {
    console.log("Substring found!");
} else {
    console.log("Substring not found.");
}
const str: string = "Hello, TypeScript World!";
const substring: string = "TypeScript";

if (new RegExp(substring).test(str)) {
    console.log("Substring found!");
} else {
    console.log("Substring not found.");
}
const str: string = "Hello, TypeScript World!";
const substring: string = "typescript";

// Using RegExp for case-insensitive search
if (new RegExp(substring, 'i').test(str)) {
    console.log("Substring found (case-insensitive)!");
}

// Using includes() with toLowerCase()
if (str.toLowerCase().includes(substring.toLowerCase())) {
    console.log("Substring found (case-insensitive)!");
}
function containsSubstring(text: string, search: string): boolean {
    return text.includes(search);
}

// Usage
const result: boolean = containsSubstring("TypeScript is awesome", "Script");
console.log(result); // true
