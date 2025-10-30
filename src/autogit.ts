function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Usage
console.log(decimalToBinary(10));  // "1010"
console.log(decimalToBinary(255)); // "11111111"
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
console.log(decimalToBinaryManual(10));  // "1010"
function decimalToBinaryBitwise(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    let num = decimal;
    
    while (num > 0) {
        binary = (num & 1) + binary;
        num = num >> 1;
    }
    
    return binary;
}

// Usage
console.log(decimalToBinaryBitwise(10));  // "1010"
function decimalToBinary32Bit(decimal: number): string {
    // Convert to unsigned 32-bit integer representation
    return (decimal >>> 0).toString(2);
}

// Usage
console.log(decimalToBinary32Bit(-10));  // "11111111111111111111111111110110"
function decimalToBinaryPadded(decimal: number, bits: number = 8): string {
    const binary = decimal.toString(2);
    return binary.padStart(bits, '0');
}

// Usage
console.log(decimalToBinaryPadded(10));     // "00001010"
console.log(decimalToBinaryPadded(10, 16)); // "0000000000001010"
function decimalToBinary(
    decimal: number, 
    options?: { bits?: number; signed?: boolean }
): string {
    // Validate input
    if (!Number.isInteger(decimal)) {
        throw new Error("Input must be an integer");
    }

    const { bits, signed = false } = options || {};
    
    let result: string;
    
    if (signed && bits) {
        // Handle signed numbers with specific bit length
        const max = Math.pow(2, bits - 1) - 1;
        const min = -Math.pow(2, bits - 1);
        
        if (decimal < min || decimal > max) {
            throw new Error(`Number out of range for ${bits}-bit signed integer`);
        }
        
        // Convert to two's complement
        if (decimal < 0) {
            result = (decimal + Math.pow(2, bits)).toString(2);
        } else {
            result = decimal.toString(2).padStart(bits, '0');
        }
    } else if (bits) {
        // Handle unsigned with specific bit length
        if (decimal < 0 || decimal >= Math.pow(2, bits)) {
            throw new Error(`Number out of range for ${bits}-bit unsigned integer`);
        }
        result = decimal.toString(2).padStart(bits, '0');
    } else {
        // Default conversion
        result = decimal.toString(2);
    }
    
    return result;
}

// Usage examples
console.log(decimalToBinary(10));                      // "1010"
console.log(decimalToBinary(10, { bits: 8 }));         // "00001010"
console.log(decimalToBinary(-5, { bits: 8, signed: true })); // "11111011"
