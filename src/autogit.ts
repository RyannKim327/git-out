function decimalToBinary(num: number): string {
    if (num === 0) return '0';
    return num.toString(2);
}

// Examples
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
console.log(decimalToBinary(0)); // "0"
function decimalToBinary(num: number): string {
    if (num === 0) return '0';
    
    if (num < 0) {
        // For negative numbers, show the binary of the absolute value with a negative sign
        return '-' + Math.abs(num).toString(2);
    }
    
    return num.toString(2);
}

// Examples
console.log(decimalToBinary(-10)); // "-1010"
console.log(decimalToBinary(-5)); // "-101"
function decimalToBinaryFixed(num: number, bits: number): string {
    if (num === 0) return '0'.repeat(bits);
    
    // Handle negative numbers with two's complement
    let binary = Math.abs(num).toString(2);
    
    if (num < 0) {
        // Invert bits
        const inverted = binary
            .padStart(bits, '0')
            .split('')
            .map(bit => bit === '0' ? '1' : '0')
            .join('');
        
        // Add 1
        const complement = (parseInt(inverted, 2) + 1).toString(2);
        binary = complement.padStart(bits, '0');
    } else {
        binary = binary.padStart(bits, '0');
    }
    
    return binary;
}

// Examples (8-bit representation)
console.log(decimalToBinaryFixed(10, 8));  // "00001010"
console.log(decimalToBinaryFixed(-10, 8)); // "11110110"
console.log(decimalToBinaryFixed(255, 8)); // "11111111"
function decimalToBinaryManual(num: number): string {
    if (num === 0) return '0';
    
    let binary = '';
    let absoluteNum = Math.abs(num);
    
    while (absoluteNum > 0) {
        binary = (absoluteNum % 2) + binary;
        absoluteNum = Math.floor(absoluteNum / 2);
    }
    
    return num < 0 ? '-' + binary : binary;
}

// Examples
console.log(decimalToBinaryManual(10)); // "1010"
console.log(decimalToBinaryManual(-13)); // "-1101"
function decimalToBinarySafe(num: number): string {
    if (!Number.isInteger(num) || !Number.isSafeInteger(num)) {
        throw new Error('Input must be a safe integer');
    }
    
    if (num === 0) return '0';
    
    return num.toString(2);
}

// Examples
console.log(decimalToBinarySafe(42)); // "101010"
try {
    decimalToBinarySafe(3.14); // Throws error
} catch (e) {
    console.log(e.message); // "Input must be a safe integer"
}
