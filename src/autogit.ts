const str: string = "123";
const num: number = parseInt(str, 10); // Base 10
console.log(num); // 123

// For hexadecimal, binary, etc:
const hexStr: string = "FF";
const hexNum: number = parseInt(hexStr, 16);
console.log(hexNum); // 255
const str: string = "456";
const num: number = Number(str);
console.log(num); // 456
const str: string = "789";
const num: number = +str;
console.log(num); // 789
const decimalStr: string = "123.45";
const intNum: number = Math.floor(parseFloat(decimalStr));
console.log(intNum); // 123
function safeParseInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

const result = safeParseInt("abc");
console.log(result); // null
const str: string = "123";

// TypeScript will infer the type as number
const num = parseInt(str, 10);

// Or explicitly type it
const num2: number = parseInt(str, 10);
// Without radix (can lead to unexpected results)
parseInt("08"); // 0 in some environments (treated as octal)

// With radix
parseInt("08", 10); // 8 (always treated as decimal)
const inputs = ["123", "456.78", "abc", "123xyz"];

inputs.forEach(input => {
    const num = parseInt(input, 10);
    if (isNaN(num)) {
        console.log(`Invalid number: ${input}`);
    } else {
        console.log(`Parsed: ${num}`);
    }
});
function convertToInt(str: string): number {
    const num = parseInt(str, 10);
    if (isNaN(num)) {
        throw new Error(`Cannot convert "${str}" to integer`);
    }
    return num;
}

// Usage
try {
    const result = convertToInt("123");
    console.log(result); // 123
} catch (error) {
    console.error(error.message);
}
