function calculateMean(numbers: number[]): number {
    // Check if the array is empty to avoid division by zero
    if (numbers.length === 0) {
        throw new Error("Cannot calculate mean of an empty array");
    }
    
    // Calculate the sum of the numbers
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    // Calculate the mean
    const mean = sum / numbers.length;
    
    return mean;
}

// Example usage
const numbers = [10, 20, 30, 40, 50];
const mean = calculateMean(numbers);
console.log(`Mean: ${mean}`);
