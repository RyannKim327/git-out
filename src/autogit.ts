const string1: string = "Hello, ";
const string2: string = "World!";
const concatenated: string = string1 + string2;

console.log(concatenated); // Output: Hello, World!
const string1: string = "Hello, ";
const string2: string = "World!";
const concatenated: string = string1.concat(string2);

console.log(concatenated); // Output: Hello, World!
const string1: string = "Hello, ";
const string2: string = "World!";
const concatenated: string = `${string1}${string2}`;

console.log(concatenated); // Output: Hello, World!
const string1: string = "Hello, ";
const string2: string = "World!";
const concatenated: string = [string1, string2].join('');

console.log(concatenated); // Output: Hello, World!
