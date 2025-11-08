/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than `min` and no greater than `max`.
 * If min or max are floats, they are floored/ceiled to define the integer range correctly.
 * @param min The minimum integer value (inclusive).
 * @param max The maximum integer value (inclusive).
 * @returns A random integer within the specified range.
 */
function getRandomIntInclusive(min: number, max: number): number {
    // Ensure min and max are integers to define the integer range
    // For example, if min=3.5, it becomes 4. If max=9.8, it becomes 9.
    min = Math.ceil(min);
    max = Math.floor(max);

    // Swap min and max if min is greater than max to ensure correct range
    if (min > max) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Usage Examples ---
console.log("Random integer between 1 and 10 (inclusive):", getRandomIntInclusive(1, 10)); // e.g., 5, 1, 10
console.log("Random integer between -5 and 5 (inclusive):", getRandomIntInclusive(-5, 5)); // e.g., -2, 0, 4
console.log("Random integer between 100 and 100 (inclusive):", getRandomIntInclusive(100, 100)); // Always 100
console.log("Random integer between 3.5 and 9.8 (inclusive):", getRandomIntInclusive(3.5, 9.8)); // Will be between 4 and 9
/**
 * Generates a random floating-point number between min (inclusive) and max (exclusive).
 * The value is no lower than `min` and is less than `max`.
 * @param min The minimum float value (inclusive).
 * @param max The maximum float value (exclusive).
 * @returns A random float within the specified range.
 */
function getRandomFloat(min: number, max: number): number {
    // Swap min and max if min is greater than max to ensure correct range
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.random() * (max - min) + min;
}

// --- Usage Examples ---
console.log("Random float between 0 and 1 (exclusive of 1):", getRandomFloat(0, 1)); // e.g., 0.12345, 0.998
console.log("Random float between 1.5 and 3.5 (exclusive of 3.5):", getRandomFloat(1.5, 3.5)); // e.g., 2.12, 3.499
console.log("Random float between -10 and 0 (exclusive of 0):", getRandomFloat(-10, 0)); // e.g., -5.3, -0.001
