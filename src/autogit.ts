function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Example usage:
const decimalNumber = 42;
const binaryString = decimalToBinary(decimalNumber);
console.log(`The binary representation of ${decimalNumber} is ${binaryString}`);
function decimalToBinary(decimal: number, length: number = 0): string {
    const binaryString = decimal >= 0 ? decimal.toString(2) : (Math.abs(decimal) >>> 0).toString(2);
    return binaryString.padStart(length, '0');
}

// Example usage:
const decimalNumber = -42;
const binaryString = decimalToBinary(decimalNumber, 8); // Output will be padded to 8 bits
console.log(`The binary representation of ${decimalNumber} is ${binaryString}`);
