const stringValue: string = "123";
const intValue: number = parseInt(stringValue, 10); // Always specify radix (base 10)

console.log(intValue); // 123 (number)
console.log(typeof intValue); // "number"
const stringValue: string = "123";
const intValue: number = Number(stringValue);

console.log(intValue); // 123 (number)
const stringValue: string = "123";
const intValue: number = +stringValue;

console.log(intValue); // 123 (number)
const stringValue: string = "123.99";
const intValue: number = Math.floor(parseFloat(stringValue));

console.log(intValue); // 123 (truncates decimal)
// TypeScript will help catch invalid conversions
function safeParseInt(str: string): number {
    const result = parseInt(str, 10);
    if (isNaN(result)) {
        throw new Error(`Invalid number: ${str}`);
    }
    return result;
}

// Or provide a default value
function parseIntWithDefault(str: string, defaultValue: number = 0): number {
    const result = parseInt(str, 10);
    return isNaN(result) ? defaultValue : result;
}
// Examples of different behaviors
console.log(parseInt("123abc", 10)); // 123 (stops at first non-digit)
console.log(Number("123abc"));       // NaN (entire string must be numeric)
console.log(+"123abc");              // NaN

console.log(parseInt("", 10));       // NaN
console.log(Number(""));             // 0 (surprising behavior!)
console.log(+"");                    // 0
function toInteger(value: string): number {
    const result = parseInt(value, 10);
    if (isNaN(result)) {
        throw new Error(`Cannot convert "${value}" to integer`);
    }
    return result;
}

// Or with default value
function toInteger(value: string, defaultValue: number = 0): number {
    const result = parseInt(value, 10);
    return isNaN(result) ? defaultValue : result;
}
