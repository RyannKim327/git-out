const stringValue: string = "123";
const numberValue: number = parseInt(stringValue);
console.log(numberValue); // 123
const result: number = parseInt(stringValue, 10);
if (!isNaN(result)) {
    console.log(result);
} else {
    console.log("Invalid number");
}
const stringValue: string = "456";
const numberValue: number = Number(stringValue);
console.log(numberValue); // 456
const stringValue: string = "789";
const numberValue: number = +stringValue;
console.log(numberValue); // 789
const stringValue: string = "123.99";
const intValue: number = Math.floor(parseInt(stringValue));
console.log(intValue); // 123
function safeParseInt(value: string): number | null {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? null : parsed;
}

const result = safeParseInt("abc");
if (result !== null) {
    console.log(result);
} else {
    console.log("Invalid input");
}
const stringValue: string = "123";
const numberValue: number = parseInt(stringValue) as number;
