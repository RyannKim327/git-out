function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error if preferred
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
        throw new Error('Cannot calculate mean of empty array');
    }
    
    // Validate that all elements are numbers
    if (!numbers.every(num => typeof num === 'number')) {
        throw new Error('Array must contain only numbers');
    }
    
    const sum = numbers.reduce((total, num) => total + num, 0);
    return sum / numbers.length;
}

// Usage
try {
    const numbers = [10, 20, 30, 40, 50];
    const mean = calculateMean(numbers);
    console.log(mean); // Output: 30
} catch (error) {
    console.error(error.message);
}
const calculateMean = (numbers: number[]): number => 
    numbers.reduce((sum, num) => sum + num, 0) / (numbers.length || 1);

// Usage
const mean = calculateMean([2, 4, 6, 8]);
console.log(mean); // Output: 5
class StatisticsCalculator {
    static mean(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    }
    
    // You could add other statistical methods here
    static median(numbers: number[]): number {
        // Implementation for median
        return 0;
    }
}

// Usage
const numbers = [1, 3, 5, 7, 9];
const mean = StatisticsCalculator.mean(numbers);
console.log(mean); // Output: 5
function calculateMean<T extends number>(numbers: T[]): number {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Usage
const integers = [1, 2, 3] as const;
const mean = calculateMean([...integers]);
console.log(mean); // Output: 2
