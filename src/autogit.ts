const str: string = "Hello, World!";
const substring: string = "World";

if (str.includes(substring)) {
    console.log("Substring found!");
} else {
    console.log("Substring not found!");
}
const str: string = "Hello, World!";
const substring: string = "World";

if (str.indexOf(substring) !== -1) {
    console.log("Substring found!");
} else {
    console.log("Substring not found!");
}
const str: string = "Hello, World!";
const substring: string = "World";

if (new RegExp(substring).test(str)) {
    console.log("Substring found!");
} else {
    console.log("Substring not found!");
}
const str: string = "Hello, World!";
const substring: string = "World";

if (str.search(substring) !== -1) {
    console.log("Substring found!");
} else {
    console.log("Substring not found!");
}
// Case-sensitive search (default)
const str = "Hello, World!";
console.log(str.includes("world")); // false
console.log(str.includes("World")); // true

// Case-insensitive search
console.log(str.toLowerCase().includes("world")); // true

// Using regex for case-insensitive search
console.log(/world/i.test(str)); // true
function containsSubstring(text: string, searchString: string): boolean {
    return text.includes(searchString);
}

// Usage
const result = containsSubstring("TypeScript is awesome", "Script");
console.log(result); // true
