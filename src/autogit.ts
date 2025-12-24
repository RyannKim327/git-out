const str = "123";
const num = parseInt(str);
console.log(num); // 123
console.log(typeof num); // number

// With radix (base) parameter
const binaryStr = "1010";
const binaryNum = parseInt(binaryStr, 2);
console.log(binaryNum); // 10
const str = "456";
const num = Number(str);
console.log(num); // 456
const str = "789";
const num = +str;
console.log(num); // 789
const str = "123.45";
const num = Math.floor(parseFloat(str));
console.log(num); // 123
console.log(parseInt("abc")); // NaN
console.log(Number("123abc")); // NaN
console.log(+"hello"); // NaN
function safeParseInt(str: string): number | null {
    const num = parseInt(str);
    return isNaN(num) ? null : num;
}

const result = safeParseInt("123");
if (result !== null) {
    console.log(result); // 123
}
const str = "123" as string;
const num = parseInt(str) as number;
// For integers, use parseInt() with radix
const integer = parseInt("123", 10);

// For general number conversion, use Number()
const number = Number("123.45");

// Always validate
if (!isNaN(integer)) {
    // Safe to use
}
