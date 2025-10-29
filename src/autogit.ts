const str = "123";
const num: number = parseInt(str); // Result: 123

// With radix (base)
const hexStr = "FF";
const hexNum = parseInt(hexStr, 16); // Result: 255
const str = "456";
const num: number = Number(str); // Result: 456
const str = "789";
const num: number = +str; // Result: 789
const floatStr = "123.45";
const intNum: number = Math.floor(Number(floatStr)); // Result: 123
function safeParseInt(str: string): number | null {
    const num = parseInt(str);
    return isNaN(num) ? null : num;
}

// Or use type checking
const num = parseInt(str);
if (isNaN(num)) {
    // Handle invalid input
}
const str = "123";
const num = parseInt(str) as number;
function toInteger(str: string): number {
    const num = Number(str);
    return Number.isInteger(num) ? num : Math.floor(num);
}
function convertToInt(str: string): number {
    const result = parseInt(str);
    
    if (isNaN(result)) {
        throw new Error(`Cannot convert "${str}" to integer`);
    }
    
    return result;
}

// Usage
try {
    const num = convertToInt("123abc"); // This will throw an error
} catch (error) {
    console.error(error.message);
}
const numericString = "42";
const nonNumericString = "abc";

// Using parseInt
console.log(parseInt(numericString)); // 42
console.log(parseInt(nonNumericString)); // NaN

// Using Number()
console.log(Number(numericString)); // 42
console.log(Number(nonNumericString)); // NaN

// Using unary plus
console.log(+numericString); // 42
console.log(+nonNumericString); // NaN
