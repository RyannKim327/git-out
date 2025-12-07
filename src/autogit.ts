const str = "123";
const num: number = parseInt(str, 10); // Radix 10 (decimal)
console.log(num); // Output: 123 (type: number)
const str = "456";
const num: number = Number(str);
console.log(num); // Output: 456 (type: number)
const str = "789";
const num: number = +str;
console.log(num); // Output: 789 (type: number)
const str = "123abc";
const num: number = parseInt(str, 10);

if (!isNaN(num)) {
  console.log("Valid number:", num);
} else {
  console.log("Invalid input");
}
// Output: "Invalid input"
const num: number = parseInt("123", 10); // Compiler ensures `num` is a number.
