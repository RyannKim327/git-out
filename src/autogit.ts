function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Example usage
const binary = decimalToBinary(42); // Returns "101010"
console.log(binary);
function decimalToBinaryManual(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    let num = Math.abs(decimal);
    
    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }
    
    return decimal < 0 ? "-" + binary : binary;
}

// Example usage
const binaryResult = decimalToBinaryManual(42); // Returns "101010"
console.log(binaryResult);
function decimalToBinaryBitwise(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    let num = Math.abs(decimal);
    
    while (num > 0) {
        binary = (num & 1) + binary;
        num = num >> 1;
    }
    
    return decimal < 0 ? "-" + binary : binary;
}

// Example usage
const binaryOutput = decimalToBinaryBitwise(42); // Returns "101010"
console.log(binaryOutput);
function decimalToBinaryPadded(decimal: number, bits: number = 8): string {
    const binary = decimal.toString(2);
    
    // Handle negative numbers
    if (decimal < 0) {
        return binary.padStart(bits, '1');
    }
    
    return binary.padStart(bits, '0');
}

// Example usage
console.log(decimalToBinaryPadded(42));      // "00101010"
console.log(decimalToBinaryPadded(42, 16));  // "0000000000101010"
function decimalToBinarySafe(decimal: number): string {
    // Validate input
    if (!Number.isInteger(decimal)) {
        throw new Error("Input must be an integer");
    }
    
    // Handle zero
    if (decimal === 0) return "0";
    
    // Convert to binary
    const binary = decimal.toString(2);
    
    return binary;
}

// Example usage
try {
    console.log(decimalToBinarySafe(42));    // "101010"
    console.log(decimalToBinarySafe(-42));   // "-101010"
    console.log(decimalToBinarySafe(0));     // "0"
} catch (error) {
    console.error(error.message);
}
