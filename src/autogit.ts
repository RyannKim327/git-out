function decimalToBinary(decimal: number): string {
    return decimal.toString(2);
}

// Example usage:
const decimalNumber = 42;
const binaryString = decimalToBinary(decimalNumber);
console.log(`The binary representation of ${decimalNumber} is ${binaryString}`);
