const firstName: string = "Ada";
const lastName: string = "Lovelace";

const fullName: string = firstName + " " + lastName;
console.log(fullName); // "Ada Lovelace"
const firstName: string = "Grace";
const lastName: string = "Hopper";

const fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // "Grace Hopper"
const a: string = "Hello";
const b: string = "World";

const result: string = a.concat(" ", b);
console.log(result); // "Hello World"
const parts: string[] = ["Type", "Script", "Rocks"];
const sentence: string = parts.join(" "); // "Type Script Rocks"
console.log(sentence);
// 1️⃣ + operator
const hello: string = "Hello";
const world: string = "World";
const plusResult = hello + ", " + world + "!";

// 2️⃣ Template literal
const tmplResult = `${hello}, ${world}!`;

// 3️⃣ concat()
const concatResult = hello.concat(", ", world, "!");

// 4️⃣ join()
const parts = [hello, world];
const joinResult = parts.join(", ") + "!";

console.log({ plusResult, tmplResult, concatResult, joinResult });
/*
{
  plusResult: 'Hello, World!',
  tmplResult: 'Hello, World!',
  concatResult: 'Hello, World!',
  joinResult: 'Hello, World!'
}
*/
