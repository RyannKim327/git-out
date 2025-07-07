function largestPrimeFactor(n: number): number {
    let maxPrime = -1;

    // Handle the smallest prime factor 2
    while (n % 2 === 0) {
        maxPrime = 2;
        n = n / 2;
    }

    // Check for odd factors starting from 3
    let factor = 3;
    const sqrtN = Math.sqrt(n);
    while (factor <= sqrtN && n > 1) {
        while (n % factor === 0) {
            maxPrime = factor;
            n = n / factor;
        }
        factor += 2;
    }

    // If remaining n is greater than 1, it is a prime factor
    if (n > 1) {
        maxPrime = n;
    }

    return maxPrime;
}

// Example usage:
const number = 13195;
console.log(`Largest prime factor of ${number} is ${largestPrimeFactor(number)}`);
// Output: Largest prime factor of 13195 is 29
