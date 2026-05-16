/**
 * Return a random integer *between* `min` and `max` **inclusive**.
 *
 * @param min - lowest possible value
 * @param max - highest possible value
 */
function randInt(min: number, max: number): number {
  const lower = Math.ceil(min);                // in case min is decimal
  const upper = Math.floor(max);               // in case max is decimal
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
const roll = randInt(1, 6);   // a fair 1‑to‑6 dice roll
console.log(roll);            // 1, 2, 3, 4, 5, or 6
/**
 * Return a random float *between* `min` (inclusive) and `max` (exclusive).
 *
 * @param min - lowest possible value
 * @param max - value we’ll never hit
 */
function randFloat(min = 0, max = 1): number {
  return Math.random() * (max - min) + min;
}
const lerp = randFloat(0, 1);   // a random number in [0, 1)
// Simple LCG – not cryptographically secure,
// but good enough for games, demos, tests etc.
function lcg(seed: number) {
  const m = 0x80000000; // 2^31
  const a = 1103515245;
  const c = 12345;
  let state = seed % m;
  return () => {
    state = (a * state + c) % m;
    return state / m; // raw [0,1)
  };
}

const random = lcg(123456);          // seed=123456
const randIntSeeded = (min: number, max: number) =>
  Math.floor(random() * (max - min + 1)) + min;
