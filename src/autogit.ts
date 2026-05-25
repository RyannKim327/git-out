const a = "Hello, ";
const b = "world!";

// 1. Using the + operator
const c1 = a + b;              // "Hello, world!"

// 2. Using a template literal
const c2 = `${a}${b}`;         // "Hello, world!"
function greet(firstName: string, lastName: string): string {
  return firstName + " " + lastName;          // or `${firstName} ${lastName}`
}
