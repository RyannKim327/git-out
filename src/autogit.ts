const first = "Hello, ";
const second = "world!";

// Using + operator
const greeting1 = first + second; // "Hello, world!"

// Using a template literal
const greeting2 = `${first}${second}`; // "Hello, world!"

// Using concat()
const greeting3 = first.concat(second); // "Hello, world!"

console.log(greeting1, greeting2, greeting3);
