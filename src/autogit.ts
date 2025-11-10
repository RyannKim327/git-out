function largestPrimeFactor(n: number): number | null {
    if (n <= 1) return null; // Handle invalid values
    
    let num = n;
    let largestFactor = 1;

    // Handle factor 2 (the only even prime)
    if (num % 2 === 0) {
        largestFactor = 2;
        while (num % 2 === 0) {
            num /= 2;
        }
    }

    // Check odd factors up to sqrt(num)
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            largestFactor = i;
            num /= i;
        }
    }

    // If remaining number is prime (greater than 2)
    if (num > 2) {
        largestFactor = num;
    }

    return largestFactor;
}
console.log(largestPrimeFactor(13195));  // Output: 29
console.log(largestPrimeFactor(17));     // Output: 17 (prime number)
console.log(largestPrimeFactor(1));      // Output: null
