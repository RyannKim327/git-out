function decimalToBinary(num: number): string {
    return num.toString(2);
}

// Example usage
console.log(decimalToBinary(10));  // "1010"
console.log(decimalToBinary(42));  // "101010"
console.log(decimalToBinary(255)); // "11111111"
function decimalToBinaryManual(num: number): string {
    if (num === 0) return "0";
    
    let binary = "";
    let n = num;
    
    while (n > 0) {
        binary = (n % 2) + binary;
        n = Math.floor(n / 2);
    }
    
    return binary;
}

// Example usage
console.log(decimalToBinaryManual(10));  // "1010"
function decimalToBinaryBitwise(num: number): string {
    if (num === 0) return "0";
    
    let binary = "";
    let n = num;
    
    while (n > 0) {
        binary = (n & 1) + binary;
        n = n >>> 1;  // Unsigned right shift
    }
    
    return binary;
}

// Example usage
console.log(decimalToBinaryBitwise(10));  // "1010"
function decimalToBinaryRecursive(num: number): string {
    if (num === 0) return "0";
    if (num === 1) return "1";
    
    return decimalToBinaryRecursive(Math.floor(num / 2)) + (num % 2).toString();
}

// Example usage
console.log(decimalToBinaryRecursive(10));  // "1010"
function decimalToBinaryPadded(num: number, bits: number = 8): string {
    const binary = num.toString(2);
    return binary.padStart(bits, '0');
}

// Example usage
console.log(decimalToBinaryPadded(10));     // "00001010"
console.log(decimalToBinaryPadded(10, 4));  // "1010"
console.log(decimalToBinaryPadded(10, 16)); // "0000000000001010"
function safeDecimalToBinary(num: number): string {
    if (!Number.isInteger(num) || num < 0) {
        throw new Error("Input must be a non-negative integer");
    }
    
    return num.toString(2);
}

// Example usage
try {
    console.log(safeDecimalToBinary(10));    // "1010"
    console.log(safeDecimalToBinary(-5));    // Error
} catch (error) {
    console.error(error.message);
}
