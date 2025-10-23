function decimalToBinary(decimalNumber: number): string {
    return decimalNumber.toString(2);
}

// Usage
console.log(decimalToBinary(10));    // "1010"
console.log(decimalToBinary(255));   // "11111111"
console.log(decimalToBinary(42));    // "101010"
function decimalToBinaryManual(decimalNumber: number): string {
    if (decimalNumber === 0) return "0";
    
    let binary = "";
    let num = Math.abs(decimalNumber);
    
    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }
    
    // Add sign bit for negative numbers
    return decimalNumber < 0 ? "-" + binary : binary;
}

// Usage
console.log(decimalToBinaryManual(10));    // "1010"
console.log(decimalToBinaryManual(-5));    // "-101"
function decimalToBinaryBitwise(decimalNumber: number): string {
    if (decimalNumber === 0) return "0";
    
    let binary = "";
    let num = decimalNumber >>> 0; // Convert to unsigned 32-bit integer
    
    for (let i = 31; i >= 0; i--) {
        binary += (num & (1 << i)) ? '1' : '0';
    }
    
    // Remove leading zeros
    return binary.replace(/^0+/, '') || '0';
}

// Usage
console.log(decimalToBinaryBitwise(10));  // "1010"
function decimalToBinaryRecursive(decimalNumber: number): string {
    if (decimalNumber === 0) return "0";
    if (decimalNumber === 1) return "1";
    
    return decimalToBinaryRecursive(Math.floor(decimalNumber / 2)) + (decimalNumber % 2);
}

// Usage
console.log(decimalToBinaryRecursive(10));  // "1010"
function decimalToBinarySafe(decimalNumber: number): string {
    // Input validation
    if (!Number.isInteger(decimalNumber)) {
        throw new Error("Input must be an integer");
    }
    
    // Handle negative numbers (two's complement)
    if (decimalNumber < 0) {
        // Convert to 32-bit two's complement
        return (decimalNumber >>> 0).toString(2);
    }
    
    return decimalNumber.toString(2);
}

// Usage examples
console.log(decimalToBinarySafe(10));     // "1010"
console.log(decimalToBinarySafe(-10));    // "11111111111111111111111111110110" (32-bit)
console.log(decimalToBinarySafe(0));      // "0"
console.log(decimalToBinarySafe(1));      // "1"
function decimalToBinaryFixedWidth(decimalNumber: number, width: number = 8): string {
    const binary = decimalToBinarySafe(decimalNumber);
    
    // Pad with zeros to achieve desired width
    if (binary.length < width) {
        return '0'.repeat(width - binary.length) + binary;
    }
    
    return binary;
}

// Usage
console.log(decimalToBinaryFixedWidth(10));        // "00001010"
console.log(decimalToBinaryFixedWidth(10, 16));    // "0000000000001010"
