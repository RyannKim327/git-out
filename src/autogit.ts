const mainString: string = "Hello, TypeScript world!";
const substring: string = "TypeScript";

// Check if string contains substring
if (mainString.includes(substring)) {
    console.log("Substring found!");
} else {
    console.log("Substring not found!");
}

// You can also specify a starting position
if (mainString.includes("world", 10)) {
    console.log("Found 'world' starting from position 10");
}
const mainString: string = "Hello, TypeScript world!";
const substring: string = "TypeScript";

// Check if substring exists (returns -1 if not found)
if (mainString.indexOf(substring) !== -1) {
    console.log("Substring found!");
}

// Get the position where substring starts
const position = mainString.indexOf(substring);
if (position !== -1) {
    console.log(`Substring found at position: ${position}`);
}
const mainString: string = "Hello, TypeScript world!";
const substring: string = "TypeScript";

// Case-sensitive search
if (new RegExp(substring).test(mainString)) {
    console.log("Substring found!");
}

// Case-insensitive search
if (new RegExp(substring, "i").test(mainString)) {
    console.log("Substring found (case-insensitive)!");
}
// Function to check substring
function containsSubstring(main: string, sub: string): boolean {
    return main.includes(sub);
}

// Usage
const text: string = "The quick brown fox jumps over the lazy dog";
console.log(containsSubstring(text, "brown")); // true
console.log(containsSubstring(text, "red"));   // false

// Function with case-insensitive option
function containsSubstringCaseInsensitive(main: string, sub: string): boolean {
    return main.toLowerCase().includes(sub.toLowerCase());
}

console.log(containsSubstringCaseInsensitive(text, "BROWN")); // true
interface User {
    name: string;
    email: string;
}

function findUsersBySearchTerm(users: User[], searchTerm: string): User[] {
    return users.filter(user => 
        user.name.includes(searchTerm) || 
        user.email.includes(searchTerm)
    );
}

const users: User[] = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane.smith@test.com" },
    { name: "Bob Johnson", email: "bob@example.com" }
];

const results = findUsersBySearchTerm(users, "smith");
console.log(results); // Finds Jane Smith
