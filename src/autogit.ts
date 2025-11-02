function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const randomNum = getRandomNumber(5, 15);
console.log(randomNum); // Random integer between 5 and 15 (inclusive)
function getRandomInRange(min: number, max: number): number {
    // Ensure inputs are valid numbers
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Both min and max must be numbers');
    }
    
    // Ensure min is less than max
    if (min > max) {
        throw new Error('min must be less than or equal to max');
    }
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Usage
const random = getRandomInRange(1, 100);
function getRandomFloat(min: number, max: number, decimals: number = 2): number {
    const random = Math.random() * (max - min) + min;
    return Number(random.toFixed(decimals));
}

// Usage
const randomFloat = getRandomFloat(0, 1, 3); // e.g., 0.456
class RandomNumberGenerator {
    static integer(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static float(min: number, max: number, precision: number = 2): number {
        const random = Math.random() * (max - min) + min;
        return Number(random.toFixed(precision));
    }
}

// Usage
const randomInt = RandomNumberGenerator.integer(10, 20);
const randomFloat = RandomNumberGenerator.float(0, 5, 3);
npm install random
import { integer } from 'random';

function getRandomNumber(min: number, max: number): number {
    return integer(min, max);
}
// Generate random numbers for different use cases
const diceRoll = getRandomNumber(1, 6); // Random dice roll
const percentage = getRandomNumber(0, 100); // Random percentage
const temperature = getRandomFloat(-10, 35, 1); // Random temperature with 1 decimal
