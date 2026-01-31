function decimalToBinary(num: number): string {
  return num.toString(2);   // base‑2 string
}

console.log(decimalToBinary(42)); // "101010"
function decimalToBinary(num: bigint): string {
  if (num === 0n) return "0";

  let n = num;
  let bits = "";

  while (n > 0n) {
    bits = (n & 1n ? "1" : "0") + bits; // prepend the low bit
    n >>= 1n;                           // shift right
  }

  return bits;
}

console.log(decimalToBinary(42n)); // "101010"
export function toBinary(value: number | bigint): string {
  // Pick the right conversion automatically
  if (typeof value === "bigint") {
    return decimalToBinary(value);
  }
  return value.toString(2);
}
