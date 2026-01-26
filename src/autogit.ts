/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param min – lower bound, inclusive
 * @param max – upper bound, inclusive
 */
function randomInt(min: number, max: number): number {
  // Clamp values to integers just in case
  const lo = Math.ceil(min);
  const hi = Math.floor(max);

  // Math.random returns a float in [0, 1)
  const r = Math.random() * (hi - lo + 1);
  return Math.floor(r) + lo;
}
const diceRoll = randomInt(1, 6);   // 1‑6
const randomIndex = randomInt(0, array.length - 1);
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
function secureRandomInt(min: number, max: number): number {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);

  // Number of values in our range
  const range = hi - lo + 1;
  // Enough bytes to hold the full range
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);

  // Read random unsigned bytes
  const rand = new Uint8Array(bytesNeeded);
  crypto.getRandomValues(rand);

  // Convert bytes to a number
  let value = 0;
  for (let i = 0; i < bytesNeeded; i++) {
    value = (value << 8) | rand[i];
  }

  // Map into the desired range
  return (value % range) + lo;
}
function randomChoice<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new RangeError('Cannot choose from an empty array');
  }
  const idx = randomInt(0, arr.length - 1);
  return arr[idx];
}
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function randomToken(length = 8): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[randomInt(0, chars.length - 1)];
  }
  return result;
}
