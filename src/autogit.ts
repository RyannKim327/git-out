function isPrime(num: number): boolean {
    // 1. Handle edge cases:
    // Numbers less than or equal to 1 are not prime.
    if (num <= 1) {
        return false;
    }

    // The number 2 is the only even prime number.
    if (num === 2) {
        return true;
    }

    // Any other even number (greater than 2) is not prime.
    if (num % 2 === 0) {
        return false;
    }

    // 2. Check for odd divisors up to the square root of num.
    // We start from 3 and increment by 2 (to check only odd numbers).
    const limit = Math.sqrt(num);
    for (let i = 3; i <= limit; i += 2) {
        if (num % i === 0) {
            // If num is divisible by any 'i', it's not prime.
            return false;
        }
    }

    // If no divisors were found, the number is prime.
    return true;
}

// --- Examples ---

console.log(`Is 1 prime? ${isPrime(1)}`);      // false
console.log(`Is 2 prime? ${isPrime(2)}`);      // true
console.log(`Is 3 prime? ${isPrime(3)}`);      // true
console.log(`Is 4 prime? ${isPrime(4)}`);      // false (2*2)
console.log(`Is 5 prime? ${isPrime(5)}`);      // true
console.log(`Is 7 prime? ${isPrime(7)}`);      // true
console.log(`Is 9 prime? ${isPrime(9)}`);      // false (3*3)
console.log(`Is 10 prime? ${isPrime(10)}`);    // false (2*5)
console.log(`Is 11 prime? ${isPrime(11)}`);    // true
console.log(`Is 13 prime? ${isPrime(13)}`);    // true
console.log(`Is 17 prime? ${isPrime(17)}`);    // true
console.log(`Is 29 prime? ${isPrime(29)}`);    // true
console.log(`Is 97 prime? ${isPrime(97)}`);    // true
console.log(`Is 100 prime? ${isPrime(100)}`);  // false
console.log(`Is 101 prime? ${isPrime(101)}`);  // true
console.log(`Is 0 prime? ${isPrime(0)}`);      // false
console.log(`Is -5 prime? ${isPrime(-5)}`);    // false
