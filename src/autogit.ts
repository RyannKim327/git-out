function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Usage
console.log(decimalToBinary(10));  // Output: "1010"
console.log(decimalToBinary(42));  // Output: "101010"
function decimalToBinaryManual(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    let num = decimal;
    
    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }
    
    return binary;
}

// Usage
console.log(decimalToBinaryManual(10));  // Output: "1010"
function decimalToBinary32Bit(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    for (let i = 31; i >= 0; i--) {
        binary += (decimal >> i) & 1;
    }
    
    // Remove leading zeros
    return binary.replace(/^0+/, '');
}

// Usage
console.log(decimalToBinary32Bit(10));  // Output: "1010"
function decimalToBinaryRecursive(decimal: number): string {
    if (decimal === 0) return "0";
    if (decimal === 1) return "1";
    
    return decimalToBinaryRecursive(Math.floor(decimal / 2)) + (decimal % 2);
}

// Usage
console.log(decimalToBinaryRecursive(10));  // Output: "1010"
function decimalToBinarySafe(decimal: number): string {
    // Validate input
    if (!Number.isInteger(decimal) || decimal < 0) {
        throw new Error("Input must be a non-negative integer");
    }
    
    return decimal.toString(2);
}

// Usage examples
console.log(decimalToBinarySafe(10));     // "1010"
console.log(decimalToBinarySafe(255));    // "11111111"
console.log(decimalToBinarySafe(1024));   // "10000000000"

// Error case
try {
    console.log(decimalToBinarySafe(-5));
} catch (error) {
    console.error(error.message);  // "Input must be a non-negative integer"
}
function decimalToBinaryWithNegative(decimal: number, bits: number = 32): string {
    if (decimal >= 0) {
        return decimal.toString(2).padStart(bits, '0');
    } else {
        // Two's complement for negative numbers
        return ((decimal >>> 0).toString(2)).padStart(bits, '0');
    }
}

// Usage
console.log(decimalToBinaryWithNegative(10, 8));   // "00001010"
console.log(decimalToBinaryWithNegative(-10, 8));  // "11110110"
