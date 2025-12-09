function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error if preferred
    }
    
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
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
    
    // Ensure all elements are numbers
    if (!numbers.every(item => typeof item === 'number' && !isNaN(item))) {
        throw new Error('Array must contain only numbers');
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Usage
try {
    const mean = calculateMean([10, 20, 30, 40]);
    console.log(mean); // Output: 25
} catch (error) {
    console.error(error.message);
}
class StatisticsCalculator {
    static mean(numbers: number[]): number {
        if (numbers.length === 0) return 0;
        
        const sum = numbers.reduce((acc, curr) => acc + curr, 0);
        return sum / numbers.length;
    }
}

// Usage
const numbers = [2, 4, 6, 8];
const mean = StatisticsCalculator.mean(numbers);
console.log(mean); // Output: 5
function isNumberArray(arr: any[]): arr is number[] {
    return arr.every(item => typeof item === 'number' && !isNaN(item));
}

function calculateMean(numbers: unknown[]): number {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    
    if (numbers.length === 0) {
        return 0;
    }
    
    if (!isNumberArray(numbers)) {
        throw new Error('Array must contain only numbers');
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}
const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

// Usage
console.log(mean([1, 3, 5, 7])); // Output: 4
