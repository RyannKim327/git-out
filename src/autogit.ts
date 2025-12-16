const n: number = 42;
const binary: string = n.toString(2); // "101010"
const n: number = -42;
const binary: string = (n >>> 0).toString(2); // "11111111111111111111111111010110"
const big: bigint = 123456789012345678901234567890n;
const binary: string = big.toString(2);
function toBinaryFloat(num: number, precision: number = 23): string {
  const sign = num < 0 ? '1' : '0';
  num = Math.abs(num);
  const int = Math.floor(num).toString(2);
  let frac = num - Math.floor(num);
  let fracBits = '';
  while (frac > 0 && fracBits.length < precision) {
    frac *= 2;
    fracBits += Math.floor(frac);
    frac -= Math.floor(frac);
  }
  return `${sign} ${int}.${fracBits}`;
}

console.log(toBinaryFloat(3.625)); // "0 11.101"
