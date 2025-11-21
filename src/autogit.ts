const decimalToBinary = (num: number): string => {
  return num.toString(2);
};

// Example usage:
console.log(decimalToBinary(10));   // Output: "1010"
console.log(decimalToBinary(-10));  // Output: "-1010"
console.log(decimalToBinary(0));    // Output: "0"
const decimalToBinaryManual = (num: number): string => {
  if (num === 0) return '0';
  
  const isNegative = num < 0;
  let absNum = Math.abs(num);
  const binaryBits: number[] = [];
  
  // Collect remainders
  while (absNum > 0) {
    binaryBits.unshift(absNum % 2); // Prepend the remainder (reversing later is efficient)
    absNum = Math.floor(absNum / 2);
  }
  
  // Handle negative numbers
  return isNegative ? '-' + binaryBits.join('') : binaryBits.join('');
};

// Example usage:
console.log(decimalToBinaryManual(10));   // Output: "1010"
console.log(decimalToBinaryManual(-10));  // Output: "-1010"
console.log(decimalToBinaryManual(0));    // Output: "0"
