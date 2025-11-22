const firstName: string = "John";
const lastName: string = "Doe";

// Concatenating two strings with a space in between
const fullName: string = `${firstName} ${lastName}`;
console.log(fullName); // Output: John Doe

const greeting: string = `Hello, ${firstName}! Welcome to TypeScript.`;
console.log(greeting); // Output: Hello, John! Welcome to TypeScript.

// Template literals also support multi-line strings
const multiLineMessage: string = `
  This is a message
  across multiple lines.
  It's very convenient!
`;
console.log(multiLineMessage);
const city: string = "New York";
const country: string = "USA";

// Concatenating two strings directly
const location: string = city + ", " + country;
console.log(location); // Output: New York, USA

const item: string = "Laptop";
const price: number = 1200;
// When a string is involved, the + operator will convert other types to string
const productInfo: string = "Product: " + item + ", Price: $" + price;
console.log(productInfo); // Output: Product: Laptop, Price: $1200
const part1: string = "The quick brown";
const part2: string = "fox";
const part3: string = "jumps over the lazy dog.";

// Concatenating two strings
const sentence1: string = part1.concat(" ", part2);
console.log(sentence1); // Output: The quick brown fox

// Concatenating multiple strings
const sentence2: string = part1.concat(" ", part2, " ", part3);
console.log(sentence2); // Output: The quick brown fox jumps over the lazy dog.
const words: string[] = ["Hello", "TypeScript", "World"];

// Join with a space
const phrase: string = words.join(" ");
console.log(phrase); // Output: Hello TypeScript World

// Join with no separator
const combined: string = words.join("");
console.log(combined); // Output: HelloTypeScriptWorld
