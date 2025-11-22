function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error if you prefer
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    
    if (numbers.length === 0) {
        return 0; // or throw new Error('Array cannot be empty');
    }
    
    // Ensure all elements are numbers
    if (!numbers.every(item => typeof item === 'number')) {
        throw new Error('Array must contain only numbers');
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}
class StatisticsCalculator {
    static mean(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    }
}

// Usage
const result = StatisticsCalculator.mean([10, 20, 30, 40]);
console.log(result); // Output: 25
const mean = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b) / arr.length : 0;

// Usage
console.log(mean([1, 2, 3, 4, 5])); // Output: 3
function mean<T extends number>(array: T[]): number {
    return array.reduce((a, b) => a + b, 0) / array.length;
}

// Usage with different numeric types
const intMean = mean([1, 2, 3]); // number[]
const floatMean = mean([1.1, 2.2, 3.3]); // number[]
function safeMean(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error('Cannot calculate mean of empty array');
    }
    
    const sum = numbers.reduce((acc, curr) => {
        if (typeof curr !== 'number' || isNaN(curr)) {
            throw new Error('Array contains non-numeric values');
        }
        return acc + curr;
    }, 0);
    
    return sum / numbers.length;
}
