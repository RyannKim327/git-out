function randInt(min: number, max: number): number {
  // Ensure we get whole numbers
  const lower = Math.ceil(min);
  const upper = Math.floor(max);

  // Math.random() is [0, 1) – 0 inclusive, 1 exclusive
  // Multiply by (upper - lower + 1) to get the right span
  // Then add lower to shift into the desired range
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}
const random = randInt(10, 20);  // could be 10, 11, …, or 20
console.log(random);
function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
