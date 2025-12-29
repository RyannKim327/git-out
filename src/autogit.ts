let firstName: string = "John";
let lastName: string = "Doe";
let fullName: string = firstName + " " + lastName;
console.log(fullName); // "John Doe"
let firstName: string = "John";
let lastName: string = "Doe";
let fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // "John Doe"
let str1: string = "Hello";
let str2: string = "World";
let result: string = str1.concat(" ", str2);
console.log(result); // "Hello World"
let parts: string[] = ["Hello", "World"];
let result: string = parts.join(" ");
console.log(result); // "Hello World"
let name: string = "Alice";
let age: number = 25;
let message: string = `${name} is ${age} years old`;
console.log(message); // "Alice is 25 years old"
