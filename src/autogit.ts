function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage:
const randomNum = getRandomNumber(1, 10);
console.log(randomNum); // This will log a random number between 1 and 10 (inclusive)
