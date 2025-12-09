const firstName: string = "John";
const lastName: string = "Doe";

// Concatenate two strings
const fullName: string = firstName + " " + lastName;
console.log(fullName); // Output: John Doe

// Concatenate multiple strings and variables
const greeting: string = "Hello, " + firstName + "! Welcome.";
console.log(greeting); // Output: Hello, John! Welcome.

// With numbers (type coercion to string happens)
const age: number = 30;
const message: string = "My name is " + firstName + " and I am " + age + " years old.";
console.log(message); // Output: My name is John and I am 30 years old.
const firstName: string = "Jane";
const lastName: string = "Smith";
const age: number = 25;
const city: string = "New York";

// Simple concatenation
const fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // Output: Jane Smith

// Embedding multiple variables and expressions
const greeting: string = `Hello, my name is ${firstName} ${lastName}. I am ${age} years old and live in ${city}.`;
console.log(greeting);
// Output: Hello, my name is Jane Smith. I am 25 years old and live in New York.

// Multi-line strings are also easy
const multiLineMessage: string = `
  This is a message
  that spans multiple lines.
  It includes the name: ${fullName}.
`;
console.log(multiLineMessage);
/* Output:
  This is a message
  that spans multiple lines.
  It includes the name: Jane Smith.
*/

// You can even include function calls or operations
const sum: number = 10 + 5;
const calculationMessage: string = `The sum of 10 and 5 is ${sum}.`;
console.log(calculationMessage); // Output: The sum of 10 and 5 is 15.
const part1: string = "Hello";
const part2: string = "World";
const part3: string = "!";

// Concatenate two strings
const result1: string = part1.concat(" ", part2);
console.log(result1); // Output: Hello World

// Concatenate multiple strings
const result2: string = part1.concat(" ", part2, part3, " How are you?");
console.log(result2); // Output: Hello World! How are you?
const words: string[] = ["TypeScript", "is", "awesome"];

// Join with a space as a separator
const sentence: string = words.join(" ");
console.log(sentence); // Output: TypeScript is awesome

// Join with an empty string (no separator)
const combined: string = words.join("");
console.log(combined); // Output: TypeScriptisawesome

// Join with a different separator
const csvRow: string = ["data1", "data2", "data3"].join(",");
console.log(csvRow); // Output: data1,data2,data3
