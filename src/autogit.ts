const str = "123";
const num = parseInt(str);
console.log(num); // 123
console.log(typeof num); // number

// With radix (base)
const hexStr = "FF";
const hexNum = parseInt(hexStr, 16);
console.log(hexNum); // 255
const str = "456";
const num = +str;
console.log(num); // 456
console.log(typeof num); // number
const str = "789";
const num = Number(str);
console.log(num); // 789
console.log(typeof num); // number
const str: string = "999";
// This doesn't convert, just tells TypeScript to treat it as a number
const num = str as unknown as number;
// These return NaN (Not a Number)
console.log(parseInt("abc")); // NaN
console.log(+"hello"); // NaN
console.log(Number("world")); // NaN

// Check for validity
const str = "123abc";
const num = parseInt(str);
if (!isNaN(num)) {
    console.log("Valid number:", num); // 123 (parses until non-digit)
} else {
    console.log("Invalid number");
}
// Always specify radix to avoid unexpected behavior
console.log(parseInt("08")); // 8 (treated as decimal)
console.log(parseInt("08", 10)); // 8 (explicit decimal)
// parseInt is more forgiving
console.log(parseInt("123abc")); // 123

// Number() is stricter
console.log(Number("123abc")); // NaN
function safeStringToInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

const result = safeStringToInt("123");
if (result !== null) {
    console.log("Success:", result);
} else {
    console.log("Invalid number");
}
