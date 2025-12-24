function randomInt(min: number, max: number): number {
  // inclusive min, exclusive max
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomFloat(min: number, max: number): number {
  // inclusive min, exclusive max
  return Math.random() * (max - min) + min;
}

// examples
console.log(randomInt(1, 7));     // 1..6
console.log(randomFloat(0, 1)); // 0 ≤ n < 1
const inclusiveMax = Math.floor(Math.random() * (max - min + 1)) + min;
