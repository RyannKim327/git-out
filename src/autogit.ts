function calculateMean(numbers: number[]): number | null {
    if (numbers.length === 0) {
        return null; // or throw an error, depending on your needs
    }
    
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    return sum / numbers.length;
}

// Example usage:
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
