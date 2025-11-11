const str = "123";
const num = parseInt(str);
console.log(num); // 123
const str: string = "123";
const num: number = parseInt(str);
const hexStr = "FF";
const num = parseInt(hexStr, 16); // 255
const str = "123";
const num = Number(str);
console.log(num); // 123
const str = "123";
const num = +str;
console.log(num); // 123
const str = "123.45";
const num = Math.floor(Number(str));
console.log(num); // 123
// This will cause a TypeScript error if strict type checking is enabled
const num = parseInt(123); // Error: Argument of type 'number' is not assignable to type 'string'
const invalid = parseInt("abc"); // NaN
// With optional chaining and nullish coalescing
const str: string | null = getStringMaybe();
const num = parseInt(str ?? "0"); // Default to "0" if null/undefined
function convertToInt(str: string): number {
    const result = parseInt(str);
    if (isNaN(result)) {
        throw new Error("Invalid number string");
    }
    return result;
}

const num = convertToInt("123") as number;
function safeParseInt(str: string): number | null {
    const num = parseInt(str);
    return isNaN(num) ? null : num;
}

const result = safeParseInt("123"); // 123
const invalid = safeParseInt("abc"); // null
const userInput = "42";
const num = parseInt(`${userInput}`); // Ensures string type
function stringToInt(str: string, defaultValue = 0): number {
    const result = parseInt(str);
    return isNaN(result) ? defaultValue : result;
}

// Usage
const num1 = stringToInt("123"); // 123
const num2 = stringToInt("abc", 100); // 100 (default value)
