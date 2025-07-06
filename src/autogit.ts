const str: string = "123";
const num: number = parseInt(str, 10); // 10 is the radix for decimal
console.log(num); // Output: 123
const str: string = "123";
const num: number = +str;
console.log(num); // Output: 123
const str: string = "123";
const num: number = Number(str);
console.log(num); // Output: 123
const str: string = "123.45";
const num: number = Math.floor(parseFloat(str)); // Will give you 123
console.log(num); // Output: 123
const str: string = "123";
const num: number = Number.parseInt(str, 10);
console.log(num); // Output: 123
function safeParseInt(str: string): number | null {
    const trimmedStr = str.trim(); // Trim whitespace
    const num = parseInt(trimmedStr, 10);
    return isNaN(num) ? null : num; // Return null if not a number
}

console.log(safeParseInt("  123  ")); // Output: 123
console.log(safeParseInt("abc")); // Output: null
console.log(safeParseInt("")); // Output: null
