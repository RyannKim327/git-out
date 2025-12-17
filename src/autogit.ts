const firstName: string = "Ada";
const lastName: string = "Lovelace";

const fullName: string = firstName + " " + lastName; // "Ada Lovelace"
const firstName: string = "Grace";
const lastName: string = "Hopper";

const fullName: string = `${firstName} ${lastName}`; // "Grace Hopper"
const a: string = "Hello";
const b: string = "World";

const result: string = a.concat(", ", b, "!"); // "Hello, World!"
const parts: string[] = ["Type", "Script", "Rocks"];
const sentence: string = parts.join(" "); // "Type Script Rocks"
const greeting = "Hello, " + "world!"; // inferred as string
const greeting: string = "Hello, " + "world!"; // ✅ OK
function safeConcat(a: string | number, b: string | number): string {
  return `${a}${b}`; // template literals automatically call .toString()
}
const result = String(a) + String(b);
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    // ...other options
  }
}
// Types
const first: string = "Type";
const second: string = "Script";
const numberVal: number = 2025;

// 1️⃣ + operator
const plus = first + " " + second; // "Type Script"

// 2️⃣ Template literal
const tmpl = `${first} ${second} ${numberVal}`; // "Type Script 2025"

// 3️⃣ concat()
const concat = first.concat(" ", second, " ", String(numberVal)); // "Type Script 2025"

// 4️⃣ join()
const join = [first, second, numberVal].join(" "); // "Type Script 2025"

console.log({ plus, tmpl, concat, join });
