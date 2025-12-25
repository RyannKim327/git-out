/**
 * Returns a pseudo-random integer N such that min ≤ N ≤ max.
 * Both min and max are inclusive.
 */
function randomInt(min: number, max: number): number {
  min = Math.ceil(min);   // ensure integer
  max = Math.floor(max);  // ensure integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// examples
console.log(randomInt(1, 6));   // dice roll: 1‒6
console.log(randomInt(0, 100)); // 0‒100
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

console.log(randomFloat(0, 1));     // 0‒1 (exclusive of 1)
console.log(randomFloat(2.5, 7)); // 2.5‒7
function secureRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  const maxRand = 0xFFFFFFFF; // 2^32 - 1
  let rand: number;
  do {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    rand = buf[0];
  } while (rand >= Math.floor(maxRand / range) * range); // rejection sampling
  return min + (rand % range);
}
