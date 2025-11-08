function stringToIntegerParseInt(str: string): number | typeof NaN {
    const num = parseInt(str, 10); // Always specify radix 10 for decimal integers

    if (isNaN(num)) {
        console.warn(`"${str}" could not be converted to a valid integer.`);
        // You might throw an error, return a default value, or handle it otherwise.
        return NaN; // Or throw new Error("Invalid integer string");
    }
    return num;
}

console.log(stringToIntegerParseInt("123"));       // Output: 123 (number)
console.log(stringToIntegerParseInt("  456  "));   // Output: 456
console.log(stringToIntegerParseInt("789abc"));    // Output: 789
console.log(stringToIntegerParseInt("3.14"));      // Output: 3 (truncates decimals)
console.log(stringToIntegerParseInt("-100"));      // Output: -100
console.log(stringToIntegerParseInt(""));          // Output: NaN (with warning)
console.log(stringToIntegerParseInt("hello"));     // Output: NaN (with warning)
console.log(stringToIntegerParseInt("0xFF"));      // Output: 255 (if radix 10 is specified, it treats it as 0. If radix 16 is specified it would be 255. Be careful.)
console.log(parseInt("0xFF", 10)); // Output: 0
console.log(parseInt("0xFF", 16)); // Output: 255 (correct for hex)
function stringToIntegerNumber(str: string): number | typeof NaN {
    const num = Number(str);

    if (isNaN(num)) {
        console.warn(`"${str}" could not be converted to a valid number.`);
        return NaN;
    }
    // If you specifically need an integer and the input might be a float
    return Math.trunc(num); // Use Math.trunc() to get the integer part
                             // (removes fractional digits without rounding)
                             // Other options: Math.floor(), Math.ceil(), Math.round()
}

console.log(stringToIntegerNumber("123"));       // Output: 123
console.log(stringToIntegerNumber("  456  "));   // Output: 456
console.log(stringToIntegerNumber("789abc"));    // Output: NaN (with warning) - entire string must be numeric
console.log(stringToIntegerNumber("3.14"));      // Output: 3 (because of Math.trunc) - without it, it would be 3.14
console.log(stringToIntegerNumber("-100"));      // Output: -100
console.log(stringToIntegerNumber(""));          // Output: 0
console.log(stringToIntegerNumber(" "));          // Output: 0
console.log(stringToIntegerNumber("hello"));     // Output: NaN (with warning)
function stringToIntegerUnaryPlus(str: string): number | typeof NaN {
    const num = +str; // Same as Number(str)

    if (isNaN(num)) {
        console.warn(`"${str}" could not be converted to a valid number.`);
        return NaN;
    }
    return Math.trunc(num); // Again, if you need an integer from potential floats
}

console.log(stringToIntegerUnaryPlus("123"));       // Output: 123
console.log(stringToIntegerUnaryPlus("3.14"));      // Output: 3 (because of Math.trunc)
console.log(stringToIntegerUnaryPlus(""));          // Output: 0
console.log(stringToIntegerUnaryPlus("hello"));     // Output: NaN (with warning)
