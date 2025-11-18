const input: string = "Hello World TypeScript";
const result: string = input.replace(/ /g, "");
console.log(result); // Output: "HelloWorldTypeScript"
const input: string = "Hello\tWorld\nTypeScript";
const result: string = input.replace(/\s/g, "");
console.log(result); // Output: "HelloWorldTypeScript"
const input: string = "Hello World TypeScript";
const result: string = input.split(" ").join("");
console.log(result); // Output: "HelloWorldTypeScript"
function removeSpaces(str: string): string {
  return str.replace(/ /g, "");
}

// Usage
const output = removeSpaces("This is a test"); // Output: "Thisisatest"
