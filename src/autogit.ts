const str1 = "Hello";
const str2 = "World";
const result = str1 + " " + str2;
console.log(result); // "Hello World"
const str1 = "Hello";
const str2 = "World";
const result = `${str1} ${str2}`;
console.log(result); // "Hello World"
const str1 = "Hello";
const str2 = "World";
const result = str1.concat(" ", str2);
console.log(result); // "Hello World"
const str1 = "Hello";
const str2 = "World";
const result = [str1, str2].join(" ");
console.log(result); // "Hello World"
function concatenateStrings(first: string, second: string): string {
    return first + " " + second;
}

const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = concatenateStrings(firstName, lastName);
console.log(fullName); // "John Doe"
const name = "Alice";
const greeting = `Hello ${name},
Welcome to TypeScript!`;
