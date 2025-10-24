/**
 * Checks if a given number is a prime number.
 *
 * A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.
 *
 * @param num The number to check.
 * @returns true if the number is prime, false otherwise.
 */
function isPrime(num: number): boolean {
    // 1. Handle edge cases based on the definition of a prime number
    if (num <= 1) {
        return false; // Numbers less than or equal to 1 are not prime
    }
    if (num === 2) {
        return true; // 2 is the only even prime number
    }
    if (num % 2 === 0) {
        return false; // All other even numbers are not prime
    }

    // 2. Check for odd divisors starting from 3 up to the square root of the number.
    //    We only need to check up to the square root because if a number n has a divisor d > sqrt(n),
    //    then it must also have a divisor k = n/d < sqrt(n).
    //    We increment by 2 to check only odd numbers, as even numbers were already handled.
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) {
            return false; // Found a divisor, so it's not prime
        }
    }

    // 3. If no divisors were found, the number is prime
    return true;
}

// --- Examples ---
console.log(`Is 1 prime? ${isPrime(1)}`);       // false
console.log(`Is 2 prime? ${isPrime(2)}`);       // true
console.log(`Is 3 prime? ${isPrime(3)}`);       // true
console.log(`Is 4 prime? ${isPrime(4)}`);       // false
console.log(`Is 5 prime? ${isPrime(5)}`);       // true
console.log(`Is 7 prime? ${isPrime(7)}`);       // true
console.log(`Is 10 prime? ${isPrime(10)}`);     // false
console.log(`Is 11 prime? ${isPrime(11)}`);     // true
console.log(`Is 29 prime? ${isPrime(29)}`);     // true
console.log(`Is 97 prime? ${isPrime(97)}`);     // true
console.log(`Is 100 prime? ${isPrime(100)}`);   // false
console.log(`Is 101 prime? ${isPrime(101)}`);   // true
console.log(`Is -5 prime? ${isPrime(-5)}`);     // false
console.log(`Is 0 prime? ${isPrime(0)}`);       // false

// Large prime number (for demonstration, within JS number precision)
console.log(`Is 104729 prime? ${isPrime(104729)}`); // true (10,000th prime)
