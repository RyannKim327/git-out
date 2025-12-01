let firstName: string = "John";
let lastName: string = "Doe";

// Concatenate with a space in between
let fullName: string = firstName + " " + lastName;

console.log(fullName); // Output: John Doe

let greeting: string = "Hello";
let message: string = greeting + ", world!";
console.log(message); // Output: Hello, world!
let product: string = "Laptop";
let price: number = 1200;
let currency: string = "USD";

// Using template literals to embed variables directly
let productInfo: string = `The ${product} costs $${price} ${currency}.`;

console.log(productInfo); // Output: The Laptop costs $1200 USD.

let city: string = "New York";
let country: string = "USA";

// Template literals can also handle multi-line strings
let address: string = `
  Location: ${city},
  Country: ${country}
`;

console.log(address);
/* Output:
  Location: New York,
  Country: USA
*/
let part1: string = "Hello";
let part2: string = "World";
let part3: string = "!";

let fullString: string = part1.concat(" ", part2, part3);

console.log(fullString); // Output: Hello World!

let firstNameAgain: string = "Jane";
let lastNameAgain: string = "Doe";
let welcomeMessage: string = "Welcome, ".concat(firstNameAgain, " ", lastNameAgain, "!");
console.log(welcomeMessage); // Output: Welcome, Jane Doe!
