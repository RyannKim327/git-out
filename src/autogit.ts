const str1: string = "Hello";
const str2: string = " World";
const result: string = str1 + str2;
console.log(result); // "Hello World"
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // "John Doe"
const part1: string = "Hello";
const part2: string = " TypeScript";
const result: string = part1.concat(part2);
console.log(result); // "Hello TypeScript"

// You can also chain multiple strings
const chained: string = part1.concat(" ", "World");
console.log(chained); // "Hello World"
const strings: string[] = ["Hello", "TypeScript"];
const result: string = strings.join(" ");
console.log(result); // "Hello TypeScript"
const num: number = 123;
const str: string = "Number: " + num; // This works (number converted to string)
// const error: string = "Text" + {}; // Error: Object not convertible to string
// Recommended approach for most cases
const greeting: string = `Hello, ${name}! Welcome to ${appName}.`;
