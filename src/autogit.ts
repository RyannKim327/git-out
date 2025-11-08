const str1 = "Hello";
const str2 = "TypeScript";
const result = str1 + " " + str2; // "Hello TypeScript"
const firstName = "John";
const lastName = "Doe";
const fullName = `${firstName} ${lastName}`; // "John Doe"
const part1 = "Hello";
const part2 = "World";
const result = part1.concat(" ", part2); // "Hello World"
const strings = ["Hello", "TypeScript"];
const result = strings.join(" "); // "Hello TypeScript"
// Using + operator
const greeting = "Hello" + " " + "World";

// Using template literals
const name = "Alice";
const message = `Welcome, ${name}!`;

// Using concat()
const combined = "Type".concat("Script");

console.log(greeting); // "Hello World"
console.log(message);  // "Welcome, Alice!"
console.log(combined); // "TypeScript"
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// This would cause a compile-time error if you try to pass a number:
// greet(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'
