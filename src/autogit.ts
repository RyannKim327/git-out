/**
 * Returns a random integer N such that min ≤ N ≤ max.
 * If you want a float instead, remove the Math.floor call.
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// examples
console.log(randomInt(1, 6));   // dice: 1..6
console.log(randomInt(10, 99)); // two-digit numbers
const n = Math.floor(Math.random() * (max - min)) + min; // min ≤ n < max
function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  if (range <= 0) throw new RangeError('Invalid range');
  const maxRand = 0xFFFFFFFF;            // 32-bit mask
  let x: number;
  do {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= Math.floor(maxRand / range) * range); // rejection sampling
  return min + (x % range);
}
