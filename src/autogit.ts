const a = "Hello, ";
const b = "world!";

// 1. Using the + operator
const joined1 = a + b;                 // "Hello, world!"

// 2. Using template literals
const joined2 = `${a}${b}`;            // also "Hello, world!"
const joined3 = a.concat(b);           // "Hello, world!"
