const str1: string = "Hello";
const str2: string = "World";
const result: string = str1 + " " + str2;
console.log(result); // Output: "Hello World"
const firstName: string = "John";
const lastName: string = "Doe";
const fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // Output: "John Doe"
const part1: string = "Hello";
const part2: string = "TypeScript";
const result: string = part1.concat(" ", part2);
console.log(result); // Output: "Hello TypeScript"
const strings: string[] = ["Hello", "TypeScript", "World"];
const result: string = strings.join(" ");
console.log(result); // Output: "Hello TypeScript World"
