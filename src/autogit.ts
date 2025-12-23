function randomInt(min: number, max: number): number {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);
  return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
}

const n: number = randomInt(10, 99); // e.g. 42
function randomInt<T extends number>(min: T, max: T): T {
  const intMin = Math.ceil(min) as T;
  const intMax = Math.floor(max) as T;
  return (Math.floor(Math.random() * (intMax - intMin + 1)) + intMin) as T;
}
function randomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
