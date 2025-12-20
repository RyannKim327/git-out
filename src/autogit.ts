const str = "123";
const num: number = parseInt(str, 10); // Always specify radix (base 10)
console.log(num); // 123
const str = "123";
const num: number = Number(str);
console.log(num); // 123
const str = "123";
const num: number = +str;
console.log(num); // 123
function safeParseInt(str: string): number | null {
    const num = parseInt(str, 10);
    // Check if parsing was successful and it's not NaN
    if (isNaN(num)) {
        return null;
    }
    return num;
}

// Usage
const result1 = safeParseInt("123"); // 123
const result2 = safeParseInt("abc"); // null
const result3 = safeParseInt("123.45"); // 123 (decimal part is truncated)
function toInteger(str: string): number {
    const num = parseInt(str, 10);
    if (isNaN(num)) {
        throw new Error(`Cannot convert '${str}' to integer`);
    }
    return num;
}

// Usage
try {
    const num = toInteger("456");
    console.log(num); // 456
} catch (error) {
    console.error(error.message);
}
// Best practice
const myInteger: number = parseInt("123", 10);
