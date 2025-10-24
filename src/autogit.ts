const message: string = "Hello, TypeScript developers!";

// Case-sensitive check
console.log(message.includes("Type"));       // true
console.log(message.includes("type"));       // false (because of 'T' vs 't')
console.log(message.includes("World"));      // false
console.log(message.includes("developers", 10)); // true (starts searching from index 10)
console.log(message.includes("developers", 25)); // false (starts searching after "developers")
const sentence: string = "The quick brown fox jumps over the lazy dog.";

// Check if it contains "fox"
if (sentence.indexOf("fox") !== -1) {
    console.log("The sentence contains 'fox' at index:", sentence.indexOf("fox")); // 16
} else {
    console.log("The sentence does not contain 'fox'.");
}

// Case-sensitive check
console.log(sentence.indexOf("The"));      // 0
console.log(sentence.indexOf("the"));      // 31 (different case, different position)
console.log(sentence.indexOf("cat"));      // -1
const product: string = "Apple iPhone 15 Pro";
const searchLower: string = "iphone"; // User might type this

if (product.toLowerCase().includes(searchLower.toLowerCase())) {
    console.log(`'${product}' contains '${searchLower}' (case-insensitive).`); // true
} else {
    console.log(`'${product}' does not contain '${searchLower}' (case-insensitive).`);
}

// Example with different case
const anotherSearch: string = "pro";
if (product.toLowerCase().includes(anotherSearch.toLowerCase())) {
    console.log(`'${product}' contains '${anotherSearch}' (case-insensitive).`); // true
}
const text: string = "My email is user@example.com.";

// Case-sensitive regex search
const emailRegex: RegExp = /example\.com/; // Need to escape the dot
console.log(emailRegex.test(text)); // true

// Case-insensitive regex search using the 'i' flag
const fruitRegex: RegExp = /apple/i; // 'i' flag for case-insensitive
console.log(fruitRegex.test("I have an Apple.")); // true
console.log(fruitRegex.test("I have an apple.")); // true

// Search for a word boundary (e.g., "TypeScript" as a whole word, not "MyTypeScript")
const wordRegex: RegExp = /\bTypeScript\b/; // \b is a word boundary
console.log(wordRegex.test("Hello, TypeScript developers!")); // true
console.log(wordRegex.test("Hello, MyTypeScript developers!")); // false
const data: string = "The price is $123.45.";
const dollarSignRegex: RegExp = /\$/;

console.log(data.search(dollarSignRegex)); // 13 (index of '$')
console.log(data.search(/€/));            // -1
