function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Usage
const binary = decimalToBinary(42); // Returns "101010"
console.log(binary);
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
const binaryManual = decimalToBinaryManual(42); // Returns "101010"
console.log(binaryManual);
function decimalToBinaryPadded(decimal: number, bits: number = 8): string {
    return (decimal >>> 0).toString(2).padStart(bits, '0');
}

// Usage
const binaryPadded = decimalToBinaryPadded(42, 8); // Returns "00101010"
console.log(binaryPadded);
function decimalToBinary32Bit(decimal: number): string {
    // Convert to 32-bit unsigned integer representation
    return (decimal >>> 0).toString(2);
}

// Usage
const negativeBinary = decimalToBinary32Bit(-42); // Returns "11111111111111111111111111010110"
console.log(negativeBinary);
function decimalToBinarySafe(decimal: number): string {
    if (!Number.isInteger(decimal)) {
        throw new Error("Input must be an integer");
    }
    
    if (decimal < 0) {
        // Handle negative numbers using 32-bit representation
        return (decimal >>> 0).toString(2);
    }
    
    return decimal.toString(2);
}

// Usage examples
console.log(decimalToBinarySafe(42));    // "101010"
console.log(decimalToBinarySafe(-42));   // "11111111111111111111111111010110"
console.log(decimalToBinarySafe(0));     // "0"
