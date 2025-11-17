function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error: throw new Error("Cannot calculate mean of empty array");
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
        throw new Error("Cannot calculate mean of empty array");
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / numbers.length;
    
    // Handle potential floating point precision issues
    return parseFloat(mean.toFixed(10));
}

// Usage with try-catch
try {
    const numbers = [10, 20, 30, 40, 50];
    const mean = calculateMean(numbers);
    console.log(`Mean: ${mean}`); // Output: Mean: 30
} catch (error) {
    console.error(error.message);
}
const calculateMean = (numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
};

// Usage
const data = [2.5, 3.7, 1.8, 4.2, 5.1];
const average = calculateMean(data);
console.log(average); // Output: 3.46
class Statistics {
    static mean(numbers: number[]): number {
        if (numbers.length === 0) {
            throw new Error("Array cannot be empty");
        }
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    }
    
    // You can add other statistical methods here
    static median(numbers: number[]): number {
        // Implementation for median
    }
}

// Usage
const numbers = [1, 2, 3, 4, 5, 6];
const mean = Statistics.mean(numbers);
console.log(mean); // Output: 3.5
function calculateMean<T extends number>(numbers: T[]): number {
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc: number, curr: T) => acc + curr, 0);
    return sum / numbers.length;
}

// Usage
const integers = [1, 2, 3, 4, 5] as const;
const floats = [1.1, 2.2, 3.3, 4.4, 5.5];

console.log(calculateMean(integers)); // 3
console.log(calculateMean(floats));   // 3.3
