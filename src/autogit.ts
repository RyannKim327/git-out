const str = "123";
const num: number = parseInt(str, 10); // Base 10

console.log(num); // 123
const str = "123";
const num: number = +str;

console.log(num); // 123
const str = "123";
const num: number = Number(str);

console.log(num); // 123
const str = "123.45";
const num: number = Math.floor(Number(str));

console.log(num); // 123
const invalid = "abc";
console.log(parseInt(invalid)); // NaN
console.log(+invalid);          // NaN
console.log(Number(invalid));   // NaN
function safeParseInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

const result = safeParseInt("123"); // 123
const invalid = safeParseInt("abc"); // null
const binary = "1010";
const decimal = parseInt(binary, 2); // 10

const hex = "FF";
const decimalFromHex = parseInt(hex, 16); // 255
const floatStr = "123.99";
const integer1 = parseInt(floatStr); // 123 (stops at decimal)
const integer2 = Math.floor(Number(floatStr)); // 123
const str = "123";
const num = parseInt(str, 10); // Always specify radix 10
