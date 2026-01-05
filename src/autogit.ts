const n = 42;
const binary = n.toString(2);   // "101010"
console.log(binary);
function toBinary(n: number): string {
  if (n === 0) return "0";

  let result = "";
  while (n > 0) {
    result = (n & 1) + result; // or: (n % 2) + result
    n >>>= 1;                    // unsigned right-shift
  }
  return result;
}

console.log(toBinary(42)); // "101010"
const big = 123456789012345678901234567890n;
const binary = big.toString(2);
console.log(binary);
