function decimalToBinary(dec: number | bigint): string {
  return dec.toString(2);
}

// Examples
console.log(decimalToBinary(13));      // '1101'
console.log(decimalToBinary(255n));    // '11111111'
function decimalToBinaryIterative(num: number): string {
  if (num === 0) return '0';
  let n = Math.abs(num);
  const bits: string[] = [];
  while (n > 0) {
    bits.push((n % 2).toString());
    n = Math.floor(n / 2);
  }
  if (num < 0) bits.push('-');
  return bits.reverse().join('');
}

// Demo
console.log(decimalToBinaryIterative(13));   // '1101'
console.log(decimalToBinaryIterative(-13));  // '-1101'
function decimalToBinaryRecursive(num: number): string {
  if (num === 0) return '';
  const [higher, bit] = decimalToBinaryRecursive(Math.floor(num / 2)).split('|', 2);
  return `${higher}|${num % 2}`;
}

// Helper to clean up the leading empty part
function binaryRecursive(num: number): string {
  const bin = decimalToBinaryRecursive(num);
  return bin.split('|').filter(Boolean).join('');
}

// Demo
console.log(binaryRecursive(27));  // '11011'
function decimalToBinaryFraction(num: number, precision: number = 10): string {
  const intPart = Math.trunc(num);
  let fracPart = num - intPart;
  let binary = intPart.toString(2);

  if (precision > 0 && fracPart > 0) {
    binary += '.';
    let p = 0;
    while (p < precision && fracPart > 0) {
      fracPart *= 2;
      if (fracPart >= 1) {
        binary += '1';
        fracPart -= 1;
      } else {
        binary += '0';
      }
      p++;
    }
  }

  return binary;
}

// Demo
console.log(decimalToBinaryFraction(5.6875, 8)); // '101.1011'
function test(input: number | bigint) {
  console.log(`Decimal: ${input}`);
  console.log(`  -> toString(2):   ${input.toString(2)}`);
  if (typeof input === 'number') {
    console.log(`  -> iterative:   ${decimalToBinaryIterative(input)}`);
    console.log(`  -> recursive:   ${binaryRecursive(input)}`);
  }
  console.log('');
}

test(13);
test(-13);
test(0);
test(5.6875);   // only the toString version works for BigInt
