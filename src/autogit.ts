const str1: string = "Hello";
const str2: string = " World";
const result: string = str1 + str2; // "Hello World"
const str1: string = "Hello";
const str2: string = "World";
const result: string = `${str1} ${str2}`; // "Hello World"
const firstName: string = "Jane";
const lastName: string = "Doe";
const fullName: string = firstName + " " + lastName; // "Jane Doe"

// Or with template literals (cleaner for expressions):
const greeting: string = `Hello, ${firstName} ${lastName}!`; // "Hello, Jane Doe!"
