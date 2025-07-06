function getRandomNumberInRange(min: number, max: number): number {
  // Generate a random number between min (inclusive) and max (exclusive)
  return Math.random() * (max - min) + min;
}
const randomNumber = getRandomNumberInRange(5, 15);
console.log(randomNumber); // e.g., 7.123456789
function getRandomIntInRange(min: number, max: number): number {
  // Generate a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomInt = getRandomIntInRange(1, 10);
console.log(randomInt); // e.g., 3
