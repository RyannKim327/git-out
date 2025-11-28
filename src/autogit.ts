function largestPrimeFactor(n: number): number | null {
    if (!Number.isInteger(n) || n <= 1) {
        return null;
    }

    let largest = 1;
    let current = n;
    let divisor = 2;

    while (divisor * divisor <= current) {
        if (current % divisor === 0) {
            largest = divisor;
            while (current % divisor === 0) {
                current /= divisor;
            }
        }
        divisor++;
    }

    if (current > 1) {
        largest = current;
    }

    return largest;
}
console.log(largestPrimeFactor(6));    // Output: 3
console.log(largestPrimeFactor(15));   // Output: 5
console.log(largestPrimeFactor(17));   // Output: 17
console.log(largestPrimeFactor(1));    // Output: null
console.log(largestPrimeFactor(-5));   // Output: null
