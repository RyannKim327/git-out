/**
 * Checks if a given number is a prime number.
 *
 * @param num The number to check.
 * @returns True if the number is prime, false otherwise.
 */
function isPrime(num: number): boolean {
    // 1. Handle edge cases
    // Numbers less than or equal to 1 are not prime by definition.
    if (num <= 1) {
        return false;
    }
    // 2 is the only even prime number.
    if (num === 2) {
        return true;
    }
    // All other even numbers are not prime.
    if (num % 2 === 0) {
        return false;
    }

    // 2. Check for odd divisors
    // We only need to check for divisors up to the square root of 'num'.
    // If 'num' has a divisor greater than its square root, it must also have one smaller than its square root.
    // We start checking from 3 and increment by 2 (skipping even numbers)
    // since we've already handled the case for even 'num' and even divisors.
    const limit = Math.sqrt(num);
    for (let i = 3; i <= limit; i += 2) {
        if (num % i === 0) {
            return false; // Found a divisor, so it's not prime
        }
    }

    // If no divisors were found, the number is prime.
    return true;
}

// --- Examples ---
console.log(`Is 7 prime? ${isPrime(7)}`);         // true
console.log(`Is 10 prime? ${isPrime(10)}`);       // false (divisible by 2, 5)
console.log(`Is 1 prime? ${isPrime(1)}`);         // false
console.log(`Is 0 prime? ${isPrime(0)}`);         // false
console.log(`Is -5 prime? ${isPrime(-5)}`);       // false
console.log(`Is 2 prime? ${isPrime(2)}`);         // true
console.log(`Is 3 prime? ${isPrime(3)}`);         // true
console.log(`Is 4 prime? ${isPrime(4)}`);         // false
console.log(`Is 13 prime? ${isPrime(13)}`);       // true
console.log(`Is 97 prime? ${isPrime(97)}`);       // true
console.log(`Is 99 prime? ${isPrime(99)}`);       // false (divisible by 3, 9, 11, 33)
console.log(`Is 101 prime? ${isPrime(101)}`);     // true
