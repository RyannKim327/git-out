function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Example usage
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
console.log(decimalToBinary(42)); // "101010"
function decimalToBinaryCustom(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    let num = decimal;
    
    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }
    
    return binary;
}

// Example usage
console.log(decimalToBinaryCustom(10)); // "1010"
function decimalToBinaryWithNegative(decimal: number, bits: number = 32): string {
    if (decimal >= 0) {
        return decimal.toString(2).padStart(bits, '0');
    } else {
        // Two's complement for negative numbers
        return ((decimal >>> 0).toString(2)).substr(-bits);
    }
}

// Example usage
console.log(decimalToBinaryWithNegative(10, 8)); // "00001010"
console.log(decimalToBinaryWithNegative(-10, 8)); // "11110110"
function decimalToBinary32Bit(decimal: number): string {
    return (decimal >>> 0).toString(2);
}

// Example usage
console.log(decimalToBinary32Bit(10)); // "1010"
console.log(decimalToBinary32Bit(-10)); // "11111111111111111111111111110110"
function decimalToBinarySafe(decimal: number): string {
    if (!Number.isInteger(decimal)) {
        throw new Error("Input must be an integer");
    }
    
    if (decimal < 0) {
        return (decimal >>> 0).toString(2);
    }
    
    return decimal.toString(2);
}

// Example usage
try {
    console.log(decimalToBinarySafe(42)); // "101010"
    console.log(decimalToBinarySafe(-42)); // "11111111111111111111111111010110"
} catch (error) {
    console.error(error.message);
}
