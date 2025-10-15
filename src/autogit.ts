function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Examples
console.log(decimalToBinary(10));    // "1010"
console.log(decimalToBinary(255));   // "11111111"
console.log(decimalToBinary(42));    // "101010"
function decimalToBinaryManual(decimal: number): string {
    if (decimal === 0) return "0";
    
    let num = Math.abs(decimal);
    let binary = "";
    
    while (num > 0) {
        binary = (num % 2) + binary;
        num = Math.floor(num / 2);
    }
    
    // Add negative sign if original number was negative
    return decimal < 0 ? "-" + binary : binary;
}

// Examples
console.log(decimalToBinaryManual(10));    // "1010"
console.log(decimalToBinaryManual(-5));    // "-101"
function decimalToBinaryBitwise(decimal: number): string {
    if (decimal === 0) return "0";
    
    let num = Math.abs(decimal);
    let binary = "";
    
    for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1;
        // Remove leading zeros
        if (bit === 1 || binary !== "") {
            binary += bit;
        }
    }
    
    return decimal < 0 ? "-" + binary : binary;
}

// Examples
console.log(decimalToBinaryBitwise(10));    // "1010"
function decimalToBinaryComplete(decimal: number): string {
    // Input validation
    if (!Number.isInteger(decimal)) {
        throw new Error("Input must be an integer");
    }
    
    // Handle zero case
    if (decimal === 0) return "0";
    
    // Convert using toString with radix 2
    return decimal.toString(2);
}

// Examples with error handling
try {
    console.log(decimalToBinaryComplete(10));     // "1010"
    console.log(decimalToBinaryComplete(0));      // "0"
    console.log(decimalToBinaryComplete(-42));    // "-101010"
    // console.log(decimalToBinaryComplete(3.14)); // Throws error
} catch (error) {
    console.error(error.message);
}
function decimalToBinaryPadded(decimal: number, length?: number): string {
    const binary = decimal.toString(2);
    
    if (length && binary.length < length) {
        return binary.padStart(length, '0');
    }
    
    return binary;
}

// Examples with padding
console.log(decimalToBinaryPadded(10));          // "1010"
console.log(decimalToBinaryPadded(10, 8));       // "00001010"
console.log(decimalToBinaryPadded(255, 16));     // "0000000011111111"
// Simple usage
const binaryNumber = (42).toString(2); // "101010"

// With function
function convertToBinary(num: number): string {
    return num.toString(2);
}

const result = convertToBinary(100); // "1100100"
console.log(result);
