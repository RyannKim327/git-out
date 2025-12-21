const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = firstName + " " + lastName;
console.log(fullName); // "John Doe"
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // "John Doe"
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = firstName.concat(" ", lastName);
console.log(fullName); // "John Doe"
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = [firstName, lastName].join(" ");
console.log(fullName); // "John Doe"
const name: string = "John";
const age: number = 30;
const message: string = `My name is ${name} and I'm ${age} years old`;
console.log(message); // "My name is John and I'm 30 years old"
