function decimalToBinary(num: number): string {
  return num.toString(2);
}

// Example usage
console.log(decimalToBinary(10));   // "1010"
console.log(decimalToBinary(-5));   // "-101"
console.log(decimalToBinary(0));    // "0"
function decimalToBinaryManual(num: number): string {
  if (num === 0) return "0";
  
  let binary = '';
  let absNum = Math.abs(num);
  
  while (absNum > 0) {
    binary = (absNum % 2) + binary; // Prepend remainder
    absNum = Math.floor(absNum / 2);
  }
  
  return num < 0 ? `-${binary}` : binary;
}

// Example usage
console.log(decimalToBinaryManual(10));   // "1010"
console.log(decimalToBinaryManual(-5));   // "-101"
console.log(decimalToBinaryManual(0));    // "0"
