const str1: string = "Hello";
const str2: string = "World";
const result: string = str1 + " " + str2;
console.log(result); // "Hello World"
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // "John Doe"

// Can include expressions
const age: number = 25;
const message: string = `${fullName} is ${age} years old`;
console.log(message); // "John Doe is 25 years old"
const part1: string = "Hello";
const part2: string = "TypeScript";
const combined: string = part1.concat(" ", part2);
console.log(combined); // "Hello TypeScript"

// Can chain multiple strings
const chained: string = "Hello".concat(" ", "World", "!");
console.log(chained); // "Hello World!"
const words: string[] = ["Hello", "TypeScript", "World"];
const sentence: string = words.join(" ");
console.log(sentence); // "Hello TypeScript World"
const num: number = 42;
const text: string = "The answer is: " + num.toString(); // Explicit conversion
// OR
const text2: string = `The answer is: ${num}`; // Automatic conversion in template literals
