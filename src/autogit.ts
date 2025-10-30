function decimalToBinary(num: number): string {
    return num.toString(2);
}

// Usage
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
function decimalToBinaryManual(num: number): string {
    if (num === 0) return '0';
    
    let binary = '';
    let n = Math.abs(num);
    
    while (n > 0) {
        binary = (n % 2) + binary;
        n = Math.floor(n / 2);
    }
    
    return num < 0 ? '-' + binary : binary;
}

// Usage
console.log(decimalToBinaryManual(10)); // "1010"
console.log(decimalToBinaryManual(-5)); // "-101"
function decimalToBinaryBitwise(num: number): string {
    if (num === 0) return '0';
    
    let binary = '';
    let n = Math.abs(num);
    
    for (let i = 31; i >= 0; i--) {
        const bit = (n >> i) & 1;
        if (bit === 1 || binary !== '') {
            binary += bit;
        }
    }
    
    return num < 0 ? '-' + binary : binary;
}

// Usage
console.log(decimalToBinaryBitwise(10)); // "1010"
function decimalToBinaryRecursive(num: number): string {
    if (num === 0) return '0';
    if (num === 1) return '1';
    
    return decimalToBinaryRecursive(Math.floor(num / 2)) + (num % 2).toString();
}

// Usage
console.log(decimalToBinaryRecursive(10)); // "1010"
function decimalToBinaryComplete(num: number): string {
    // Input validation
    if (!Number.isInteger(num)) {
        throw new Error('Input must be an integer');
    }
    
    // Handle zero case
    if (num === 0) return '0';
    
    // Convert to binary
    const binary = Math.abs(num).toString(2);
    
    // Handle negative numbers
    return num < 0 ? '-' + binary : binary;
}

// Usage examples
console.log(decimalToBinaryComplete(10));    // "1010"
console.log(decimalToBinaryComplete(0));     // "0"
console.log(decimalToBinaryComplete(-5));    // "-101"
console.log(decimalToBinaryComplete(255));   // "11111111"
function decimalFractionToBinary(num: number, precision: number = 20): string {
    if (num >= 1 || num <= 0) {
        throw new Error('Fractional part must be between 0 and 1');
    }
    
    let binary = '.';
    let fraction = num;
    
    while (precision > 0 && fraction > 0) {
        fraction *= 2;
        if (fraction >= 1) {
            binary += '1';
            fraction -= 1;
        } else {
            binary += '0';
        }
        precision--;
    }
    
    return binary;
}

// Usage
console.log(decimalFractionToBinary(0.625)); // ".101"
