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
    if (numbers.length === 0) {
        return 0;
    }
    
    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }
    return sum / numbers.length;
}
const calculateMean = (numbers: number[]): number => 
    numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b) / numbers.length;
function calculateMean(numbers: number[]): number {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    
    if (numbers.length === 0) {
        return 0;
    }
    
    const sum = numbers.reduce((acc, curr) => {
        if (typeof curr !== 'number') {
            throw new Error('Array must contain only numbers');
        }
        return acc + curr;
    }, 0);
    
    return sum / numbers.length;
}
function calculateMean<T extends number>(numbers: T[]): number {
    if (numbers.length === 0) {
        return 0;
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}
function calculateMean(numbers: number[]): number {
    // Handle empty array
    if (numbers.length === 0) {
        return 0;
    }
    
    // Calculate sum using reduce
    const sum = numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    
    // Return the average
    return sum / numbers.length;
}

// Test cases
console.log(calculateMean([1, 2, 3, 4, 5]));    // 3
console.log(calculateMean([10, 20, 30]));       // 20
console.log(calculateMean([-1, 0, 1]));         // 0
console.log(calculateMean([]));                 // 0
console.log(calculateMean([5]));                // 5
