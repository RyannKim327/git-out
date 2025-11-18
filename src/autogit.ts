const stringValue = "123";
const numberValue = parseInt(stringValue);

console.log(numberValue); // 123
console.log(typeof numberValue); // "number"
const stringValue: string = "123";
const numberValue: number = parseInt(stringValue);
// Always specify the radix (base) to avoid unexpected behavior
const decimalValue = parseInt("123", 10); // Base 10
const hexValue = parseInt("FF", 16); // Base 16
const stringValue = "123";
const numberValue = Number(stringValue);

console.log(numberValue); // 123
const stringValue = "123";
const numberValue = +stringValue;

console.log(numberValue); // 123
const stringValue = "123.45";
const numberValue = Math.floor(Number(stringValue));

console.log(numberValue); // 123
console.log(parseInt("123abc")); // 123
console.log(Number("123abc")); // NaN
console.log(+"123abc"); // NaN
// Dealing with potential NaN
const stringValue = "123";
const parsedValue = parseInt(stringValue, 10);

if (isNaN(parsedValue)) {
    console.log("Invalid number");
} else {
    console.log(parsedValue); // 123
}
function safeParseInt(str: string): number {
    const result = parseInt(str, 10);
    if (isNaN(result)) {
        throw new Error(`Invalid number: ${str}`);
    }
    return result;
}

try {
    const validNumber = safeParseInt("123");
    const invalidNumber = safeParseInt("abc"); // Throws error
} catch (error) {
    console.error(error.message);
}
