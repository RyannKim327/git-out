const str = "123";
const num: number = parseInt(str);
console.log(num); // 123
console.log(typeof num); // "number"

// With radix (base)
const hexStr = "FF";
const hexNum = parseInt(hexStr, 16);
console.log(hexNum); // 255
const str = "456";
const num: number = +str;
console.log(num); // 456
const str = "789";
const num: number = Number(str);
console.log(num); // 789
// TypeScript will catch type errors at compile time
function convertToInt(str: string): number {
    const result = parseInt(str);
    
    // Check for NaN (Not a Number)
    if (isNaN(result)) {
        throw new Error(`"${str}" is not a valid integer`);
    }
    
    return result;
}

// Usage
try {
    const valid = convertToInt("123"); // 123
    const invalid = convertToInt("abc"); // Throws error
} catch (error) {
    console.error(error.message);
}
function safeParseInt(str: string, defaultValue: number = 0): number {
    const result = parseInt(str);
    return isNaN(result) ? defaultValue : result;
}

const num1 = safeParseInt("123"); // 123
const num2 = safeParseInt("abc"); // 0
const num3 = safeParseInt("xyz", 100); // 100
// Always specify radix with parseInt to avoid unexpected behavior
const num = parseInt("08", 10); // 8 (not 0 as it would be in octal)

// Use type checking for robust code
function isStringInteger(str: string): boolean {
    return !isNaN(parseInt(str)) && isFinite(parseInt(str));
}
