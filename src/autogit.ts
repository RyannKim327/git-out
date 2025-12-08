const str = "123";
const num: number = parseInt(str, 10); // 123
const str = "123";
const num: number = +str; // 123
const str = "123";
const num: number = Number(str); // 123
const str = "123.45";
const num: number = Math.floor(Number(str)); // 123
function safeStringToInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

// Example usage
const result1 = safeStringToInt("123"); // 123
const result2 = safeStringToInt("abc"); // null
const result3 = safeStringToInt("123.45"); // 123 (truncates decimal)
// With type assertion (if you're certain it's a valid number)
const str = "123" as string;
const num = parseInt(str, 10) as number;

// Using type guards for validation
function isNumericString(str: string): boolean {
    return !isNaN(parseFloat(str)) && isFinite(+str);
}

const input = "123";
if (isNumericString(input)) {
    const num: number = parseInt(input, 10);
    // num is safely converted
}
const myString = "42";
const myNumber = parseInt(myString, 10);
