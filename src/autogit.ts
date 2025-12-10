const str1: string = "Hello";
const str2: string = " World";
const result: string = str1 + str2; // "Hello World"
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = `${firstName} ${lastName}`; // "John Doe"
const part1: string = "Type";
const part2: string = "Script";
const result: string = part1.concat(part2); // "TypeScript"
const strings: string[] = ["Hello", " ", "TypeScript"];
const result: string = strings.join(""); // "Hello TypeScript"
const greeting: string = "Hello";
const name: string = "Alice";

// Method 1: + operator
const result1: string = greeting + " " + name;

// Method 2: template literals
const result2: string = `${greeting} ${name}`;

// Method 3: concat()
const result3: string = greeting.concat(" ", name);

console.log(result1); // "Hello Alice"
console.log(result2); // "Hello Alice"
console.log(result3); // "Hello Alice"
