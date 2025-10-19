function decimalToBinary(num: number): string {
    if (num === 0) return '0';
    return num.toString(2);
}

// Examples
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
console.log(decimalToBinary(0)); // "0"
function decimalToBinaryManual(num: number): string {
    if (num === 0) return '0';
    
    let binary = '';
    let n = Math.abs(num); // Handle negative numbers by taking absolute value
    
    while (n > 0) {
        binary = (n % 2) + binary;
        n = Math.floor(n / 2);
    }
    
    // Add sign indicator for negative numbers
    if (num < 0) {
        binary = '-' + binary;
    }
    
    return binary;
}

// Examples
console.log(decimalToBinaryManual(10)); // "1010"
console.log(decimalToBinaryManual(255)); // "11111111"
console.log(decimalToBinaryManual(-10)); // "-1010"
console.log(decimalToBinaryManual(0)); // "0"
function decimalToBinaryRecursive(num: number): string {
    if (num === 0) return '0';
    
    if (num % 2 === 0) {
        return decimalToBinaryRecursive(Math.floor(num / 2)) + '0';
    } else {
        return decimalToBinaryRecursive(Math.floor(num / 2)) + '1';
    }
}

// Examples
console.log(decimalToBinaryRecursive(10)); // "1010"
console.log(decimalToBinaryRecursive(255)); // "11111111"
function decimalToBinaryPadded(num: number, length: number): string {
    let binary = num.toString(2);
    while (binary.length < length) {
        binary = '0' + binary;
    }
    return binary;
}

// Examples
console.log(decimalToBinaryPadded(5, 8)); // "00000101"
console.log(decimalToBinaryPadded(255, 8)); // "11111111"
console.log(decimalToBinaryPadded(10, 4)); // "1010"
function convertToBinary(
    decimal: number, 
    options: { 
        includeSign?: boolean; 
        padLength?: number; 
        padWith?: '0' | ' '; 
    } = {}
): string {
    const { includeSign = false, padLength, padWith = '0' } = options;
    
    // Handle edge cases
    if (decimal === 0) return '0'.padStart(padLength || 1, padWith);
    if (!Number.isInteger(decimal)) {
        throw new Error('Input must be an integer');
    }
    
    // Get binary representation
    const binary = Math.abs(decimal).toString(2);
    
    // Add sign if requested
    const result = includeSign && decimal < 0 ? `-${binary}` : binary;
    
    // Pad if length specified
    if (padLength && result.length < padLength) {
        return result.padStart(padLength, padWith);
    }
    
    return result;
}

// Examples
console.log(convertToBinary(10)); // "1010"
console.log(convertToBinary(-10, { includeSign: true })); // "-1010"
console.log(convertToBinary(5, { padLength: 8 })); // "00000101"
console.log(convertToBinary(255, { padLength: 10, padWith: '0' })); // "0011111111"
