const str = "123";
const num = parseInt(str, 10); // Always specify radix (base 10)
console.log(num); // 123
const str = "123";
const num = Number(str);
console.log(num); // 123
const str = "123";
const num = +str;
console.log(num); // 123
const str = "123.45";
const num = Math.floor(Number(str));
console.log(num); // 123
// Good
const num = parseInt("123", 10);

// Avoid (may cause unexpected results)
const num = parseInt("123"); // No radix specified
function safeParseInt(str: string): number {
    const num = parseInt(str, 10);
    if (isNaN(num)) {
        throw new Error(`Invalid number: ${str}`);
    }
    return num;
}
const str = "123" as string;
const num = parseInt(str, 10) as number;
function convertToInt(input: string): number {
    const result = parseInt(input, 10);
    
    if (isNaN(result)) {
        throw new Error(`Cannot convert "${input}" to integer`);
    }
    
    return result;
}

// Usage
try {
    const numberValue = convertToInt("456");
    console.log(numberValue); // 456
} catch (error) {
    console.error(error.message);
}
