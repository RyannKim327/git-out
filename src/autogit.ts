const str = "123";
const num = parseInt(str, 10); // 123

// With radix/base (always specify for safety)
const hexString = "FF";
const hexNum = parseInt(hexString, 16); // 255
const str = "456";
const num = +str; // 456
const str = "789";
const num = Number(str); // 789
const str = "123.45";
const num = Math.floor(parseFloat(str)); // 123
// Safe conversion with validation
function safeParseInt(str: string): number | null {
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
}

// Example usage
const result1 = safeParseInt("123"); // 123
const result2 = safeParseInt("abc"); // null
const result3 = safeParseInt("123.45"); // 123 (decimal part ignored)
// You might need type assertions in some cases
const str = "100";
const num = parseInt(str, 10) as number;
