/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than `min` and no greater than `max`.
 * @param min The lower bound (inclusive).
 * @param max The upper bound (inclusive).
 * @returns A random integer within the specified range.
 */
function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);   // Ensure min is treated as an integer boundary
    max = Math.floor(max);  // Ensure max is treated as an integer boundary
    
    // The maximum is inclusive and the minimum is inclusive
    // Math.random() * (max - min + 1) generates a number from [0, max - min + 1)
    // Math.floor() truncates it to an integer from [0, max - min]
    // Adding min shifts the range to [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- Example Usage ---
console.log("Random integer between 1 and 10 (inclusive):");
console.log(getRandomIntInclusive(1, 10)); // e.g., 3, 7, 10, 1, 5

// If you pass floats, they will be floored/ceiled for integer boundaries:
console.log(getRandomIntInclusive(1.2, 9.8)); // Effectively between 2 and 9 inclusive

// To get 0 or 1 (e.g., for a boolean random choice):
console.log(getRandomIntInclusive(0, 1)); // 0 or 1
/**
 * Generates a random floating-point number between min (inclusive) and max (exclusive).
 * The value is no lower than `min` and less than `max`.
 * @param min The lower bound (inclusive).
 * @param max The upper bound (exclusive).
 * @returns A random float within the specified range.
 */
function getRandomFloat(min: number, max: number): number {
    // The maximum is exclusive and the minimum is inclusive
    // Math.random() * (max - min) generates a number from [0, max - min)
    // Adding min shifts the range to [min, max)
    return Math.random() * (max - min) + min;
}

// --- Example Usage ---
console.log("Random float between 0 and 1 (exclusive of 1):");
console.log(getRandomFloat(0, 1)); // This is essentially Math.random() itself

console.log("Random float between 1.5 and 10.5 (exclusive of 10.5):");
console.log(getRandomFloat(1.5, 10.5)); // e.g., 6.78, 1.5001, 10.499
/**
 * Generates a random floating-point number between min (inclusive) and max (inclusive).
 * Note: Achieving true inclusivity of 'max' with standard Math.random() is numerically tricky
 * due to floating point precision and Math.random()'s [0, 1) range.
 * This function provides a practical approximation where the chance of hitting 'max' is very small
 * but technically possible by extending the range slightly.
 * @param min The lower bound (inclusive).
 * @param max The upper bound (inclusive).
 * @returns A random float within the specified range, attempting to include max.
 */
function getRandomFloatInclusive(min: number, max: number): number {
    // To make max inclusive, we can slightly extend the upper bound.
    // A common, albeit imperfect, way is to add Number.EPSILON or a tiny amount.
    // This makes the range effectively [min, max + epsilon).
    // The chance of hitting max exactly is still very low but not strictly zero.
    return Math.random() * (max - min + Number.EPSILON) + min; 
}

// --- Example Usage ---
console.log("Random float between 1.0 and 5.0 (attempting inclusive of 5.0):");
console.log(getRandomFloatInclusive(1.0, 5.0)); // e.g., 3.45, 1.0001, potentially 5.0 (extremely rare)
/**
 * Generates a cryptographically secure random integer between min (inclusive) and max (inclusive).
 * @param min The lower bound (inclusive).
 * @param max The upper bound (inclusive).
 * @returns A cryptographically secure random integer within the specified range.
 * @throws {Error} If `window.crypto` is not available.
 */
function getSecureRandomIntInclusive(min: number, max: number): number {
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.getRandomValues) {
        throw new Error("window.crypto.getRandomValues is not available. This function requires a secure context.");
    }

    min = Math.ceil(min);
    max = Math.floor(max);

    // Calculate the range size + 1 for inclusive max
    const range = max - min + 1;

    // To avoid modulo bias, we find the largest multiple of 'range' that fits into the maximum
    // value of a 32-bit unsigned integer (2^32 - 1).
    // This ensures all numbers within the range have an equal probability.
    const maxUint32 = 0xFFFFFFFF; // 2^32 - 1
    const numBytes = 4; // Use 4 bytes for a Uint32Array

    // Find the largest number that is a multiple of 'range' and fits into maxUint32
    // If range is large, max may be less than what can be stored in 32 bits,
    // so it makes sense to work with the `range` itself.
    // This is often simplified for small ranges:
    let randomNumber: number;
    let byteArray = new Uint32Array(1);

    do {
        window.crypto.getRandomValues(byteArray);
        randomNumber = byteArray[0];
        // Keep generating until we get a number within the "unbiased" range
        // This avoids modulo bias if (maxUint32 + 1) % range != 0
    } while (randomNumber >= Math.floor(maxUint32 / range) * range);

    return (randomNumber % range) + min;
}

// --- Example Usage ---
try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
        console.log("\nCryptographically secure random integer between 1 and 100:");
        console.log(getSecureRandomIntInclusive(1, 100));
    } else {
        console.warn("\nCryptographically secure random numbers not available in this environment.");
    }
} catch (error) {
    console.error(error.message);
}
function getRandomIntInclusiveSafe(min: number, max: number): number {
    if (min > max) {
        // Option 1: Throw an error
        // throw new Error("min cannot be greater than max.");

        // Option 2: Swap min and max
        [min, max] = [max, min]; 
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example:
console.log("\nUsing safe function:");
console.log(getRandomIntInclusiveSafe(10, 1)); // Will swap and return between 1 and 10
// console.log(getRandomIntInclusiveSafe(10, 1)); // If throwing error, this line would crash
/**
 * Generates a random integer between min (inclusive) and max (inclusive).
 * @param min The lower bound (inclusive).
 * @param max The upper bound (inclusive).
 * @returns A random integer within the specified range.
 */
function getRandomIntInclusive(min: number, max: number): number {
    // Ensure min <= max. If not, swap them.
    if (min > max) [min, max] = [max, min]; 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random floating-point number between min (inclusive) and max (exclusive).
 * @param min The lower bound (inclusive).
 * @param max The upper bound (exclusive).
 * @returns A random float within the specified range.
 */
function getRandomFloat(min: number, max: number): number {
    // Ensure min <= max. If not, swap them.
    if (min > max) [min, max] = [max, min];
    return Math.random() * (max - min) + min;
}

// --- Example Usage ---
console.log("\n--- Final Examples ---");
console.log("Integer [1, 5]:", getRandomIntInclusive(1, 5));
console.log("Float [0.0, 1.0):", getRandomFloat(0.0, 1.0));
console.log("Integer [5, 1]: (swapped)", getRandomIntInclusive(5, 1)); // min and max are swapped internally
