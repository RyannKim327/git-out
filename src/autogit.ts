const str = "123";
const num: number = parseInt(str);
console.log(num); // 123

// With radix/base (recommended)
const num2: number = parseInt("1010", 2); // Binary to decimal
console.log(num2); // 10
const str = "456";
const num: number = Number(str);
console.log(num); // 456
const str = "789";
const num: number = +str;
console.log(num); // 789
function safeParseInt(str: string, defaultValue: number = 0): number {
    const result = parseInt(str);
    return isNaN(result) ? defaultValue : result;
}

const num1 = safeParseInt("123"); // 123
const num2 = safeParseInt("abc"); // 0
const num3 = safeParseInt("xyz", -1); // -1
const str = "12345";
const num = parseInt(str);

if (!isNaN(num)) {
    console.log(`Valid number: ${num}`);
} else {
    console.log("Invalid number");
}
const str = "42";
const num = parseInt(str) as number;
