const getRandomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Example: Get a random float between 5 and 10 (e.g., 7.624)
console.log(getRandomFloat(5, 10));
const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Example: Get a random integer between 1 and 10 (e.g., 4)
console.log(getRandomInt(1, 10));
const getRandomIntSafe = (min: number, max: number): number => {
  // Swap if min > max
  [min, max] = min > max ? [max, min] : [min, max];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Float between 5 and 20 (e.g., 12.456)
const randomFloat = getRandomFloat(5, 20); 

// Integer between 10 and 50 (e.g., 25)
const randomInt = getRandomInt(10, 50); 
