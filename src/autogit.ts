function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    return sum / numbers.length;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum / numbers.length;
}
const calculateMean = (numbers: number[]): number => 
    numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b, 0) / numbers.length;
function calculateMean(numbers: number[]): number {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    
    if (numbers.length === 0) return 0;
    
    // Ensure all elements are numbers
    if (!numbers.every(num => typeof num === 'number')) {
        throw new Error('Array must contain only numbers');
    }
    
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    return sum / numbers.length;
}
function calculateMean<T extends number>(numbers: T[]): number {
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    return sum / numbers.length;
}

// Works with different numeric types
const integers = [1, 2, 3, 4, 5];
const floats = [1.5, 2.5, 3.5];
