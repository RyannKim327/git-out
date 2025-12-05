const str: string = "123";
const num: number = parseInt(str, 10); // Always specify radix (base)
console.log(num); // 123
const str: string = "123";
const num: number = Number(str);
console.log(num); // 123
const str: string = "123";
const num: number = +str;
console.log(num); // 123
function safeParseInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

// Usage
const result1 = safeParseInt("123"); // 123
const result2 = safeParseInt("abc"); // null
const result3 = safeParseInt("123.45"); // 123 (decimal part truncated)
const str: string = "123";
const num: number = parseInt(str, 10) as number;
function convertToInt(input: string): number {
    const result = parseInt(input, 10);
    if (isNaN(result)) {
        throw new Error(`Invalid number: ${input}`);
    }
    return result;
}
