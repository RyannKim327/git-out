const message = "Hello, world! Welcome to TypeScript.";
const searchString1 = "world";
const searchString2 = "TypeScript";
const searchString3 = "hello"; // Different case
const searchString4 = "foo";

console.log(message.includes(searchString1)); // true
console.log(message.includes(searchString2)); // true
console.log(message.includes(searchString3)); // false (due to case-sensitivity)
console.log(message.includes(searchString4)); // false

// Checking from a specific position
console.log(message.includes("world", 0)); // true
console.log(message.includes("world", 10)); // false (starts searching after "world")
const sentence = "The quick brown fox jumps over the lazy dog.";
const target1 = "fox";
const target2 = "cat";
const target3 = "quick";

if (sentence.indexOf(target1) !== -1) {
    console.log(`'${target1}' found in the sentence.`); // 'fox' found in the sentence.
} else {
    console.log(`'${target1}' not found.`);
}

if (sentence.indexOf(target2) !== -1) {
    console.log(`'${target2}' found.`);
} else {
    console.log(`'${target2}' not found.`); // 'cat' not found.
}

// You can also get the position
const position = sentence.indexOf(target3);
if (position !== -1) {
    console.log(`'${target3}' found at index ${position}.`); // 'quick' found at index 4.
}
const documentText = "This document contains important information for Users.";

// Case-insensitive search
const regex1 = /users/i;
console.log(regex1.test(documentText)); // true ('Users' matches 'users' due to 'i' flag)

const regex2 = /foo/;
console.log(regex2.test(documentText)); // false

// More complex pattern: starts with 'This'
const regex3 = /^This/;
console.log(regex3.test(documentText)); // true

// Pattern: contains 'important' AND 'info' (this requires a bit more logic than just .test)
// For simple "contains" checks, stick to the direct string search or a single regex.
const productDescription = "Our product comes with a LIFETIME warranty.";

const searchRegex1 = /lifetime/i; // Case-insensitive
const matchResult1 = productDescription.match(searchRegex1);

if (matchResult1) {
    console.log(`'lifetime' found! Matched text: ${matchResult1[0]}, at index: ${matchResult1.index}`);
    // 'lifetime' found! Matched text: LIFETIME, at index: 28
} else {
    console.log("'lifetime' not found.");
}

const searchRegex2 = /extended/;
const matchResult2 = productDescription.match(searchRegex2);

if (matchResult2) {
    console.log("'extended' found.");
} else {
    console.log("'extended' not found."); // 'extended' not found.
}
