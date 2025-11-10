const str = "123";
const num = parseInt(str, 10); // 10 = decimal system (base 10)
console.log(num); // Output: 123 (as a number)
const str = "123.45";
const num1 = Number(str);  // Constructor
const num2 = +str;        // Unary plus operator
console.log(num1); // 123.45 (number)
console.log(num2); // 123.45 (number)
const str = "123abc";
const num = parseInt(str, 10);

if (!isNaN(num)) {
  // TypeScript knows `num` is a valid number here
  console.log(num.toFixed());
} else {
  console.log("Invalid number");
}
