function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Example usage:
const decimalNumber = 10;
const binaryString = decimalToBinary(decimalNumber);
console.log(`The binary representation of ${decimalNumber} is ${binaryString}`); // Output: 1010
function decimalToBinary(decimal: number): string {
    if (decimal === 0) return "0";
    
    let binary = '';
    
    while (decimal > 0) {
        const remainder = decimal % 2; // Get the remainder
        binary = remainder.toString() + binary; // Prepend the remainder to the binary string
        decimal = Math.floor(decimal / 2); // Divide the number by 2
    }
    
    return binary;
}

// Example usage:
const decimalNumber = 10;
const binaryString = decimalToBinary(decimalNumber);
console.log(`The binary representation of ${decimalNumber} is ${binaryString}`); // Output: 1010
function decimalToBinary(decimal: number): string {
    if (decimal === 0) return "0";

    let binary = '';
    let number = decimal;

    while (number > 0) {
        binary = (number & 1).toString() + binary; // Get the last bit
        number >>= 1; // Shift right by 1 to divide by 2
    }

    return binary;
}

// Example usage:
const decimalNumber = 10;
const binaryString = decimalToBinary(decimalNumber);
console.log(`The binary representation of ${decimalNumber} is ${binaryString}`); // Output: 1010
