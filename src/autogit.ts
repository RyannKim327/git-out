function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error, depending on your needs
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // 3
const calculateMean = (numbers: number[]): number => 
    numbers.length > 0 ? numbers.reduce((a, b) => a + b) / numbers.length : 0;

// Usage
const mean = calculateMean([10, 20, 30, 40, 50]);
console.log(mean); // 30
function calculateMean(numbers: number[]): number {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    
    if (numbers.length === 0) {
        throw new Error('Cannot calculate mean of empty array');
    }
    
    // Ensure all elements are numbers
    if (!numbers.every(n => typeof n === 'number')) {
        throw new Error('All array elements must be numbers');
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Usage with try-catch
try {
    const mean = calculateMean([1, 2, 3, 4, 5]);
    console.log(mean); // 3
} catch (error) {
    console.error(error.message);
}
class Statistics {
    static mean(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        return numbers.reduce((a, b) => a + b) / numbers.length;
    }
    
    // You can add other statistical methods here
    static median(numbers: number[]): number {
        // implementation for median
        return 0;
    }
}

// Usage
const numbers = [2, 4, 6, 8, 10];
const mean = Statistics.mean(numbers);
console.log(mean); // 6
function calculateMean<T extends number>(numbers: T[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Works with both number arrays and typed arrays
const result1 = calculateMean([1, 2, 3]); // number[]
const result2 = calculateMean([1.5, 2.5, 3.5]); // number[]
