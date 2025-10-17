// Using +
let result: string = str1 + " " + str2 + "!"; // "Hello TypeScript!"

// Using Template Literals
let result: string = `${str1} ${str2}!`;

// Using concat() with multiple arguments
let result: string = str1.concat(" ", str2, "!");
const firstName: string = "John";
const lastName: string = "Doe";

// Using +
const fullName1: string = firstName + " " + lastName;

// Using Template Literals
const fullName2: string = `${firstName} ${lastName}`;

// Using concat()
const fullName3: string = firstName.concat(" ", lastName);

console.log(fullName1); // "John Doe"
console.log(fullName2); // "John Doe"
console.log(fullName3); // "John Doe"
