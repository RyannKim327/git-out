function getRandomInt(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

// Example usage:
const num = getRandomInt(10, 20);
console.log(num); // Could be anything from 10 to 20 inclusive
function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Example usage:
const num = getRandomFloat(1.5, 4.2);
console.log(num); // Between 1.5 and 4.2
