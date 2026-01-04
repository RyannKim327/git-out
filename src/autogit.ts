function toBinary(n: number): string {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Only non-negative integers are supported');
  }
  return n.toString(2); // "1010" etc.
}

console.log(toBinary(13)); // → "1101"
const bits = Array.from(toBinary(13), Number); // → [1,1,0,1]
const width8 = toBinary(13).padStart(8, '0'); // → "00001101"
