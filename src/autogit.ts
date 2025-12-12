const str = "42";
const num = parseInt(str, 10); // Second parameter is radix/base (10 for decimal)
console.log(num); // 42 (number)
const str = "42";
const num = +str;
console.log(num); // 42 (number)
const str = "42";
const num = Number(str);
console.log(num); // 42 (number)
const str = "42.7";
const num = Math.floor(Number(str)); // 42
// or
const num2 = Math.round(Number(str)); // 43
// With type annotations
const str: string = "42";
const num: number = parseInt(str, 10);

// Handling potential NaN (Not a Number)
function safeParseInt(value: string): number | null {
    const result = parseInt(value, 10);
    return isNaN(result) ? null : result;
}

const result = safeParseInt("abc");
if (result !== null) {
    console.log(result);
} else {
    console.log("Invalid number");
}
// Trimming whitespace
const strWithSpaces = "  42  ";
const num = parseInt(strWithSpaces.trim(), 10); // 42

// Handling floating point numbers (parseInt vs parseFloat)
const floatStr = "42.7";
const intNum = parseInt(floatStr, 10); // 42 (truncates decimal)
const floatNum = parseFloat(floatStr); // 42.7

// Non-numeric strings
const nonNumeric = "abc";
const result = parseInt(nonNumeric, 10); // NaN
console.log(isNaN(result)); // true
// Comparison
console.log(parseInt("42px", 10)); // 42
console.log(Number("42px")); // NaN
console.log(+"42px"); // NaN
