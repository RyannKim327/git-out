function isPrime(num: number): boolean {
    if (num <= 1) return false; // 0 and 1 are not prime numbers
    if (num <= 3) return true;  // 2 and 3 are prime numbers

    // Check for even numbers and multiples of 3
    if (num % 2 === 0 || num % 3 === 0) return false;

    // Check for factors from 5 to the square root of num
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true; // num is prime
}

// Example usage
console.log(isPrime(11)); // true
console.log(isPrime(4));  // false
