const mainString: string = "Hello, TypeScript!";
const substring: string = "Type";

if (mainString.includes(substring)) {
  console.log("Substring found!");
} else {
  console.log("Substring not found.");
}
const mainString = "Hello, TypeScript!";
const substring = "typescript";

if (mainString.toLowerCase().includes(substring.toLowerCase())) {
  console.log("Substring found (case-insensitive)!");
}
const mainString: string = "Hello, World!";
const substring: string = "World";

if (mainString.indexOf(substring) !== -1) {
  console.log("Substring found!");
}
const mainString: string = "Hello, World!";
const substring: string = "world"; // Case mismatch

// Case-insensitive search
if (new RegExp(substring, "i").test(mainString)) {
  console.log("Substring found with regex!");
}
