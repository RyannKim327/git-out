function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error: throw new Error("Cannot calculate mean of empty array");
    }
    
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0;
    }
    
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum / numbers.length;
}

// Example usage
const data = [10, 20, 30, 40];
const average = calculateMean(data);
console.log(average); // Output: 25
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error("Cannot calculate mean of empty array");
    }
    
    if (!numbers.every(num => typeof num === 'number' && !isNaN(num))) {
        throw new Error("Array contains non-number values");
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Example usage with error handling
try {
    const values = [1.5, 2.5, 3.5, 4.5];
    const result = calculateMean(values);
    console.log(`Mean: ${result}`); // Output: Mean: 3
} catch (error) {
    console.error(error.message);
}
const mean = (numbers: number[]): number => 
    numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b) / numbers.length;

// Example usage
const scores = [85, 90, 78, 92, 88];
const averageScore = mean(scores);
console.log(averageScore); // Output: 86.6
class Statistics {
    static mean(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    }
    
    static meanWithPrecision(numbers: number[], decimals: number = 2): number {
        const mean = Statistics.mean(numbers);
        return Number(mean.toFixed(decimals));
    }
}

// Example usage
const temperatures = [22.5, 23.1, 21.8, 24.3, 22.9];
const avgTemp = Statistics.mean(temperatures);
const roundedAvg = Statistics.meanWithPrecision(temperatures, 1);

console.log(avgTemp); // Output: 22.92
console.log(roundedAvg); // Output: 22.9
