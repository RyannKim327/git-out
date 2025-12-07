/**
 * Generates a random integer within a specified range (inclusive of both min and max).
 *
 * @param min The minimum value (inclusive).
 * @param max The maximum value (inclusive).
 * @returns A random integer between min and max.
 */
function getRandomInt(min: number, max: number): number {
    // Ensure min and max are integers
    min = Math.ceil(min);
    max = Math.floor(max);

    // Math.random() generates a float between 0 (inclusive) and 1 (exclusive).
    // To include 'max', the range needs to be (max - min + 1).
    // Adding 'min' shifts the range to start from 'min'.
    // Math.floor() truncates the decimal part, giving an integer.
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Examples ---
console.log("Random integer between 1 and 10 (inclusive):");
console.log(getRandomInt(1, 10)); // e.g., 3, 7, 10, 1

console.log("Random integer between -5 and 5 (inclusive):");
console.log(getRandomInt(-5, 5)); // e.g., -2, 0, 4, 5

console.log("Random integer between 100 and 100:");
console.log(getRandomInt(100, 100)); // Will always be 100
/**
 * Generates a random floating-point number within a specified range (inclusive of min, exclusive of max).
 *
 * @param min The minimum value (inclusive).
 * @param max The maximum value (exclusive).
 * @returns A random float between min and max.
 */
function getRandomFloat(min: number, max: number): number {
    // Math.random() generates a float between 0 (inclusive) and 1 (exclusive).
    // Multiplying by (max - min) scales it to a range of that size.
    // Adding 'min' shifts the range to start from 'min'.
    return Math.random() * (max - min) + min;
}

// --- Examples ---
console.log("\nRandom float between 0 (inclusive) and 1 (exclusive):");
console.log(getRandomFloat(0, 1)); // e.g., 0.12345, 0.87654

console.log("Random float between 1 (inclusive) and 10 (exclusive):");
console.log(getRandomFloat(1, 10)); // e.g., 1.567, 9.123

console.log("Random float between -5 (inclusive) and 5 (exclusive):");
console.log(getRandomFloat(-5, 5)); // e.g., -4.123, 3.876
/**
 * Generates a random integer within a specified range (inclusive of min, exclusive of max).
 *
 * @param min The minimum value (inclusive).
 * @param max The maximum value (exclusive).
 * @returns A random integer between min and max-1.
 */
function getRandomIntExclusiveMax(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    // Here, (max - min) gives the direct size of the range for integers from min up to, but not including, max.
    return Math.floor(Math.random() * (max - min)) + min;
}

// --- Examples ---
console.log("\nRandom integer between 1 (inclusive) and 10 (exclusive):");
console.log(getRandomIntExclusiveMax(1, 10)); // e.g., 1, 5, 9 (never 10)

console.log("Random integer between -5 (inclusive) and 5 (exclusive):");
console.log(getRandomIntExclusiveMax(-5, 5)); // e.g., -5, 0, 4 (never 5)
