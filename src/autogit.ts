function randInt(min: number, max: number): number {
  min = Math.ceil(min);   // in case caller passed non-integers
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const n: number = randInt(10, 99); // e.g. 42
function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const x: number = randFloat(5.5, 7.2); // e.g. 6.18394
function secureRandInt(min: number, max: number): number {
  const range = max - min + 1;
  if (range <= 0) throw new RangeError('max must be >= min');
  const maxRand = 0xFFFFFFFF;            // 2^32-1
  const limit = Math.floor(maxRand / range) * range;
  let rand: number;
  do {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    rand = buf[0];
  } while (rand >= limit);               // rejection sampling
  return (rand % range) + min;
}
