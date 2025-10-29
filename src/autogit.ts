function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Examples
console.log(decimalToBinary(10));    // "1010"
console.log(decimalToBinary(255));   // "11111111"
console.log(decimalToBinary(42));    // "101010"
function decimalToBinaryManual(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    let num = Math.abs(decimal);
    
    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }
    
    // Handle negative numbers (two's complement)
    if (decimal < 0) {
        // For simplicity, this shows the positive binary with a minus sign
        // For true two's complement, you'd need more complex logic
        binary = "-" + binary;
    }
    
    return binary;
}

// Examples
console.log(decimalToBinaryManual(10));    // "1010"
console.log(decimalToBinaryManual(255));   // "11111111"
function decimalToBinaryBitwise(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = "";
    let num = decimal;
    
    for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1;
        binary += bit;
    }
    
    // Remove leading zeros
    return binary.replace(/^0+/, '') || "0";
}

// Examples
console.log(decimalToBinaryBitwise(10));    // "1010"
console.log(decimalToBinaryBitwise(255));   // "11111111"
function decimalToBinaryRecursive(decimal: number): string {
    if (decimal === 0) return "";
    return decimalToBinaryRecursive(Math.floor(decimal / 2)) + (decimal % 2);
}

function decimalToBinaryWrapper(decimal: number): string {
    if (decimal === 0) return "0";
    return decimalToBinaryRecursive(decimal);
}

// Examples
console.log(decimalToBinaryWrapper(10));    // "1010"
console.log(decimalToBinaryWrapper(255));   // "11111111"
function decimalToBinaryEnhanced(
    decimal: number, 
    options: { padLength?: number; includePrefix?: boolean } = {}
): string {
    const { padLength = 0, includePrefix = false } = options;
    
    // Input validation
    if (!Number.isInteger(decimal)) {
        throw new Error("Input must be an integer");
    }
    
    let binary = Math.abs(decimal).toString(2);
    
    // Apply padding if specified
    if (padLength > 0 && binary.length < padLength) {
        binary = binary.padStart(padLength, '0');
    }
    
    // Handle negative numbers
    if (decimal < 0) {
        binary = "-" + binary;
    }
    
    // Add prefix if requested
    if (includePrefix) {
        binary = "0b" + binary.replace(/^-/, '');
        if (decimal < 0) {
            binary = "-" + binary;
        }
    }
    
    return binary;
}

// Examples
console.log(decimalToBinaryEnhanced(10));                    // "1010"
console.log(decimalToBinaryEnhanced(10, { padLength: 8 }));  // "00001010"
console.log(decimalToBinaryEnhanced(10, { includePrefix: true })); // "0b1010"
console.log(decimalToBinaryEnhanced(-10));                   // "-1010"
// Basic usage
const binary1 = (42).toString(2); // "101010"

// With custom function
const binary2 = decimalToBinary(42); // "101010"

// With padding
const binary3 = decimalToBinaryEnhanced(42, { padLength: 8 }); // "00101010"

// With prefix
const binary4 = decimalToBinaryEnhanced(42, { includePrefix: true }); // "0b101010"

// Convert back to decimal
const decimal = parseInt(binary4, 2); // 42
