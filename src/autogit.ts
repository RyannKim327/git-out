function decimalToBinaryBuiltIn(decimal: number): string {
    if (decimal === 0) {
        return "0";
    }
    // Handles positive and negative integers.
    // For negative numbers, it will prepend a '-' and then convert the absolute value.
    // E.g., (-5).toString(2) will be "-101", not two's complement.
    return decimal.toString(2);
}

// --- Examples ---
console.log("Built-in Method:");
console.log(`13  -> ${decimalToBinaryBuiltIn(13)}`);    // Output: 1101
console.log(`0   -> ${decimalToBinaryBuiltIn(0)}`);     // Output: 0
console.log(`-5  -> ${decimalToBinaryBuiltIn(-5)}`);    // Output: -101
console.log(`255 -> ${decimalToBinaryBuiltIn(255)}`);   // Output: 11111111
console.log(`1   -> ${decimalToBinaryBuiltIn(1)}`);     // Output: 1
function decimalToBinaryManual(decimal: number): string {
    if (decimal === 0) {
        return "0";
    }

    let isNegative = decimal < 0;
    let absDecimal = Math.abs(decimal);
    let binary = "";

    while (absDecimal > 0) {
        const remainder = absDecimal % 2; // Get the remainder (0 or 1)
        binary = remainder + binary;       // Prepend the remainder to the binary string
        absDecimal = Math.floor(absDecimal / 2); // Integer division
    }

    return isNegative ? "-" + binary : binary;
}

// --- Examples ---
console.log("\nManual Division Method:");
console.log(`13  -> ${decimalToBinaryManual(13)}`);    // Output: 1101
console.log(`0   -> ${decimalToBinaryManual(0)}`);     // Output: 0
console.log(`-5  -> ${decimalToBinaryManual(-5)}`);    // Output: -101
console.log(`255 -> ${decimalToBinaryManual(255)}`);   // Output: 11111111
function decimalToBinaryBitwise(decimal: number): string {
    if (decimal === 0) {
        return "0";
    }
    if (decimal < 0) {
        // Bitwise operations on negative numbers behave according to two's complement.
        // If you just want the absolute value's binary with a minus sign,
        // you'd call this function recursively with Math.abs(decimal).
        // For actual two's complement, it's more involved and depends on the desired bit width.
        return "-" + decimalToBinaryBitwise(Math.abs(decimal));
    }

    let binary = "";
    let tempDecimal = decimal;

    while (tempDecimal > 0) {
        binary = (tempDecimal & 1) + binary; // Get the LSB (least significant bit)
        tempDecimal >>>= 1;                  // Unsigned right shift by 1 (removes LSB)
    }
    return binary;
}

// --- Examples ---
console.log("\nBitwise Operator Method (for positive integers / absolute value):");
console.log(`13  -> ${decimalToBinaryBitwise(13)}`);    // Output: 1101
console.log(`0   -> ${decimalToBinaryBitwise(0)}`);     // Output: 0
console.log(`-5  -> ${decimalToBinaryBitwise(-5)}`);    // Output: -101 (recursive call converts abs value)
console.log(`255 -> ${decimalToBinaryBitwise(255)}`);   // Output: 11111111
