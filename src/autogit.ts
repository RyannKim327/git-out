function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage
const randomNum = getRandomNumber(1, 10); // Returns a random integer between 1 and 10 (inclusive)
console.log(randomNum);
function getRandomFloat(min: number, max: number, decimals: number = 2): number {
  return Number((Math.random() * (max - min) + min).toFixed(decimals));
}

// Example: Random float between 1.0 and 10.0 with 2 decimal places
const randomFloat = getRandomFloat(1.0, 10.0);
console.log(randomFloat); // e.g., 7.42
