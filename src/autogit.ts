const str = "123";
const num: number = parseInt(str, 10); // Always specify radix (10 for decimal)
console.log(num); // Output: 123 (as a number)
const str = "456";
const num: number = Number(str);
console.log(num); // Output: 456
// Convert user input (string) to integer
const userInput: string = "42";
const numericValue: number = parseInt(userInput, 10);

if (!isNaN(numericValue)) {
  console.log("Valid integer:", numericValue);
} else {
  console.log("Invalid input!");
}
// Avoid:
parseInt("010"); // Historically parsed as octal (8) in some environments
// Use:
parseInt("010", 10); // Always 10 (decimal)
