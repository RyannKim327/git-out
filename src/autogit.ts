function largestPrimeFactor(num: number): number {
    if (num < 2) {
        throw new Error("Number must be ≥ 2");
    }

    let largestFactor = 1;
    let currentNum = num;
    let divisor = 2;

    while (divisor * divisor <= currentNum) {
        if (currentNum % divisor === 0) {
            currentNum /= divisor;
            largestFactor = divisor;
        } else {
            divisor++;
        }
    }

    if (currentNum > 1) {
        largestFactor = currentNum;
    }

    return largestFactor;
}

// Example usage
console.log(largestPrimeFactor(600851475143));  // Output: 6857
