function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error, depending on your needs
    }
    
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error("Cannot calculate mean of empty array");
    }
    
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
}

// Usage with error handling
try {
    const numbers = [10, 20, 30, 40, 50];
    const mean = calculateMean(numbers);
    console.log(`Mean: ${mean}`); // Output: Mean: 30
} catch (error) {
    console.error(error.message);
}
const calculateMean = (numbers: number[]): number => 
    numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b, 0) / numbers.length;

// Usage
const numbers = [2, 4, 6, 8, 10];
const mean = calculateMean(numbers);
console.log(mean); // Output: 6
function calculateMean(dataPoints: number[]): number {
    if (dataPoints.length === 0) {
        return NaN; // Return NaN for empty arrays
    }
    
    const total = dataPoints.reduce((runningTotal, currentValue) => runningTotal + currentValue, 0);
    const count = dataPoints.length;
    
    return total / count;
}

// Usage
const measurements = [15.5, 18.2, 12.8, 20.1, 16.7];
const average = calculateMean(measurements);
console.log(`Average: ${average.toFixed(2)}`); // Output: Average: 16.66
