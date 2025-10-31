let str1: string = "123";
let num1: number = parseInt(str1, 10); // Result: 123 (number)
console.log(num1, typeof num1); // 123 'number'

let str2: string = "123.45";
let num2: number = parseInt(str2, 10); // Result: 123 (truncates the decimal part)
console.log(num2, typeof num2); // 123 'number'

let str3: string = "123px";
let num3: number = parseInt(str3, 10); // Result: 123 (stops at 'p')
console.log(num3, typeof num3); // 123 'number'

let str4: string = "  -45 ";
let num4: number = parseInt(str4, 10); // Result: -45 (handles leading/trailing whitespace)
console.log(num4, typeof num4); // -45 'number'

let str5: string = "abc";
let num5: number = parseInt(str5, 10); // Result: NaN (Not-a-Number)
console.log(num5, typeof num5); // NaN 'number'

let str6: string = "";
let num6: number = parseInt(str6, 10); // Result: NaN
console.log(num6, typeof num6); // NaN 'number'

// Without radix 10, it can be tricky:
let str7: string = "08";
let num7_no_radix: number = parseInt(str7); // In some older engines, this might be 0 (octal) or 8.
console.log(num7_no_radix); // Modern JS/TS often defaults to 10 if no '0x' or '0o' prefix

let num7_with_radix: number = parseInt(str7, 10); // Always 8
console.log(num7_with_radix); // 8
let str1: string = "123";
let num1: number = Number(str1); // Result: 123
console.log(num1, typeof num1); // 123 'number'

let str2: string = "123.45";
let num2: number = Number(str2); // Result: 123.45 (converts to a float)
console.log(num2, typeof num2); // 123.45 'number'

let str3: string = "123px";
let num3: number = Number(str3); // Result: NaN (entire string is not a number)
console.log(num3, typeof num3); // NaN 'number'

let str4: string = "  -45 ";
let num4: number = Number(str4); // Result: -45 (handles leading/trailing whitespace)
console.log(num4, typeof num4); // -45 'number'

let str5: string = "abc";
let num5: number = Number(str5); // Result: NaN
console.log(num5, typeof num5); // NaN 'number'

let str6: string = "";
let num6: number = Number(str6); // Result: 0 (empty string becomes 0)
console.log(num6, typeof num6); // 0 'number'
let str1: string = "123";
let num1: number = +str1; // Result: 123
console.log(num1, typeof num1); // 123 'number'

let str2: string = "123.45";
let num2: number = +str2; // Result: 123.45
console.log(num2, typeof num2); // 123.45 'number'

let str3: string = "123px";
let num3: number = +str3; // Result: NaN
console.log(num3, typeof num3); // NaN 'number'

let str4: string = "";
let num4: number = +str4; // Result: 0
console.log(num4, typeof num4); // 0 'number'
let floatStr: string = "123.78";
let floatNum: number = Number(floatStr); // 123.78

let integerFloor: number = Math.floor(floatNum); // Result: 123 (rounds down)
console.log("Floor:", integerFloor);

let integerCeil: number = Math.ceil(floatNum); // Result: 124 (rounds up)
console.log("Ceil:", integerCeil);

let integerRound: number = Math.round(floatNum); // Result: 124 (rounds to nearest integer)
console.log("Round:", integerRound);

// For truncation (removing decimal part without rounding up/down):
let integerTrunc: number = Math.trunc(floatNum); // Result: 123
console.log("Trunc:", integerTrunc);
function stringToInteger(str: string): number | null {
    const parsed = parseInt(str, 10); // Or Number(str) or +str

    if (isNaN(parsed)) {
        console.warn(`Could not convert "${str}" to an integer. Returning null.`);
        return null; // Or throw an error, or return a default value like 0
    }
    return parsed;
}

let result1 = stringToInteger("123");     // 123
let result2 = stringToInteger("abc");     // null, and a warning
let result3 = stringToInteger("123.45");  // 123 (due to parseInt)
let result4 = stringToInteger("  -50  "); // -50

console.log(result1, result2, result3, result4);

// Using Number() with check
function stringToIntegerStrict(str: string): number | null {
    const parsed = Number(str); // Or +str

    // We also might want to check if it's actually an integer and not a float
    if (isNaN(parsed) || !Number.isInteger(parsed)) {
        console.warn(`Could not convert "${str}" to a strict integer. Returning null.`);
        return null;
    }
    return parsed;
}

let strictResult1 = stringToIntegerStrict("123");     // 123
let strictResult2 = stringToIntegerStrict("abc");     // null
let strictResult3 = stringToIntegerStrict("123.45");  // null (because it's not an integer)
let strictResult4 = stringToIntegerStrict("  -50  "); // -50
let strictResult5 = stringToIntegerStrict("");        // null (Number("") is 0, which IS an integer, but maybe not desired for empty string)
console.log(strictResult1, strictResult2, strictResult3, strictResult4, strictResult5);
