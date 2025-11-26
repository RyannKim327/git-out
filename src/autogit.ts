const str: string = "Age: ";
const num: number = 25;
const result: string = str + num.toString(); // Explicit conversion
// Or use template literals (automatic conversion):
const resultAlt: string = `${str}${num}`; // "Age: 25"
const words: string[] = ["Hello", "World"];
const sentence: string = words.join(" "); // "Hello World"
