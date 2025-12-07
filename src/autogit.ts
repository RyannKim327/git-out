function decimalToBinary(decimal: number): string {
  return decimal.toString(2);
}

// Test
console.log(decimalToBinary(10)); // "1010"
console.log(decimalToBinary(255)); // "11111111"
function decimalToBinaryManual(decimal: number): string {
  if (decimal === 0) return "0";

  let binary = "";
  let num = decimal;

  while (num > 0) {
    binary = (num % 2) + binary;
    num = Math.floor(num / 2);
  }

  return binary;
}

console.log(decimalToBinaryManual(10)); // "1010"
console.log(decimalToBinaryManual(255)); // "11111111"
