function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
// Random integer between 1 and 10 (inclusive)
const randomInt = getRandomInt(1, 10);

// Random float between 1.0 (inclusive) and 10.0 (exclusive)
const randomFloat = getRandomFloat(1, 10);
