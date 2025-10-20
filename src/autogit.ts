// Basic integer conversion
let str1 = "123";
let num1 = parseInt(str1, 10); // num1 is 123 (number)
console.log(`"${str1}" -> ${num1}, type: ${typeof num1}`);

// With non-numeric suffix
let str2 = "456px";
let num2 = parseInt(str2, 10); // num2 is 456 (number)
console.log(`"${str2}" -> ${num2}, type: ${typeof num2}`);

// With decimals (truncates)
let str3 = "789.99";
let num3 = parseInt(str3, 10); // num3 is 789 (number)
console.log(`"${str3}" -> ${num3}, type: ${typeof num3}`);

// String starting with non-numeric character
let str4 = "abc123";
let num4 = parseInt(str4, 10); // num4 is NaN (number)
console.log(`"${str4}" -> ${num4}, type: ${typeof num4}`);

// Empty string
let str5 = "";
let num5 = parseInt(str5, 10); // num5 is NaN (number)
console.log(`"${str5}" -> ${num5}, type: ${typeof num5}`);

// Handling potential NaN
if (!isNaN(num4)) {
    console.log("Valid number:", num4);
} else {
    console.log(`"${str4}" is not a valid integer.`);
}
// Basic integer conversion
let str6 = "123";
let num6 = Number(str6); // num6 is 123 (number)
console.log(`"${str6}" -> ${num6}, type: ${typeof num6}`);

// With non-numeric suffix (results in NaN)
let str7 = "456px";
let num7 = Number(str7); // num7 is NaN (number)
console.log(`"${str7}" -> ${num7}, type: ${typeof num7}`);

// With decimals (converts to float)
let str8 = "789.99";
let num8 = Number(str8); // num8 is 789.99 (number)
console.log(`"${str8}" -> ${num8}, type: ${typeof num8}`);

// Empty string
let str9 = "";
let num9 = Number(str9); // num9 is 0 (number)
console.log(`"${str9}" -> ${num9}, type: ${typeof num9}`);

// Null
let valNull: string | null = null;
let numNull = Number(valNull); // numNull is 0 (number)
console.log(`null -> ${numNull}, type: ${typeof numNull}`);

// Undefined
let valUndefined: string | undefined = undefined;
let numUndefined = Number(valUndefined); // numUndefined is NaN (number)
console.log(`undefined -> ${numUndefined}, type: ${typeof numUndefined}`);
// Basic integer conversion
let str10 = "123";
let num10 = +str10; // num10 is 123 (number)
console.log(`"${str10}" -> ${num10}, type: ${typeof num10}`);

// With non-numeric suffix (results in NaN)
let str11 = "456px";
let num11 = +str11; // num11 is NaN (number)
console.log(`"${str11}" -> ${num11}, type: ${typeof num11}`);

// With decimals (converts to float)
let str12 = "789.99";
let num12 = +str12; // num12 is 789.99 (number)
console.log(`"${str12}" -> ${num12}, type: ${typeof num12}`);

// Empty string
let str13 = "";
let num13 = +str13; // num13 is 0 (number)
console.log(`"${str13}" -> ${num13}, type: ${typeof num13}`);
// Basic float conversion
let str14 = "123.45";
let num14 = parseFloat(str14); // num14 is 123.45 (number)
console.log(`"${str14}" -> ${num14}, type: ${typeof num14}`);

// With non-numeric suffix
let str15 = "67.89em";
let num15 = parseFloat(str15); // num15 is 67.89 (number)
console.log(`"${str15}" -> ${num15}, type: ${typeof num15}`);

// If you need an integer after parseFloat:
let intFromFloat = Math.floor(num15); // intFromFloat is 67
console.log(`Integer from float: ${intFromFloat}`);
