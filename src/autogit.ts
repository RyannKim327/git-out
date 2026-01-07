const firstName: string = "Ada";
const lastName: string = "Lovelace";

const fullName: string = firstName + " " + lastName; // "Ada Lovelace"
const firstName: string = "Grace";
const lastName: string = "Hopper";

const fullName: string = `${firstName} ${lastName}`; // "Grace Hopper"
const a: string = "Alan";
const b: string = "Turing";

const combined: string = a.concat(" ", b); // "Alan Turing"
const age: number = 42;
const message: string = `You are ${age} years old.`; // "You are 42 years old."
// or
const message2: string = "You are " + age + " years old.";
const ageStr: string = age.toString();
const message3: string = "You are " + ageStr + " years old.";
function greet(firstName: string, lastName: string): string {
  // Using a template literal for clarity
  return `Hello, ${firstName} ${lastName}!`;
}

console.log(greet("Katherine", "Johnson")); // → "Hello, Katherine Johnson!"
// 1️⃣ + operator
const c1 = a + b;

// 2️⃣ Template literal (recommended)
const c2 = `${a}${b}`;

// 3️⃣ concat()
const c3 = a.concat(b);
