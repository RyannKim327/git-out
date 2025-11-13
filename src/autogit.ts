const str1: string = "Hello, ";
const str2: string = "world!";
const result: string = str1 + str2; // "Hello, world!"
const str1: string = "Hello";
const str2: string = "world!";
const result: string = `${str1}, ${str2}`; // "Hello, world!"
const str1: string = "Hello";
const str2: string = "world!";
const result: string = str1.concat(", ", str2); // "Hello, world!"
const num: number = 123;
const text: string = "test";

// Explicitly convert non-string types
const result1: string = text + String(num); // "test123"
const result2: string = `${text}${num}`;    // "test123" (auto-conversion)
