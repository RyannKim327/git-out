function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // Or throw an error if you prefer
    }
    
    const sum = numbers.reduce((total, current) => total + current, 0);
    return sum / numbers.length;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
    if (!Array.isArray(numbers)) {
        throw new TypeError('Input must be an array');
    }
    
    if (numbers.length === 0) {
        throw new Error('Cannot calculate mean of empty array');
    }
    
    // Ensure all elements are numbers
    if (!numbers.every(item => typeof item === 'number')) {
        throw new TypeError('All array elements must be numbers');
    }
    
    const sum = numbers.reduce((total, current) => total + current, 0);
    return sum / numbers.length;
}

// Usage with try-catch
try {
    const mean = calculateMean([10, 20, 30, 40, 50]);
    console.log(mean); // Output: 30
} catch (error) {
    console.error(error.message);
}
const mean = (arr: number[]): number => 
    arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

// Usage
const result = mean([2, 4, 6, 8]);
console.log(result); // Output: 5
class Statistics {
    static mean(data: number[]): number {
        if (data.length === 0) return 0;
        return data.reduce((sum, value) => sum + value, 0) / data.length;
    }
    
    // You could add other statistical methods here
    static median(data: number[]): number {
        // Implementation for median
        return 0;
    }
}

// Usage
const numbers = [1, 2, 3, 4, 5, 6];
const average = Statistics.mean(numbers);
console.log(average); // Output: 3.5
function calculateMean<T extends number>(numbers: T[]): number {
    if (numbers.length === 0) return 0;
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Works with both number[] and more specific types
const integers = [1, 2, 3] as const;
const mean = calculateMean(integers);
console.log(mean); // Output: 2
interface DataPoint {
    value: number;
    timestamp: Date;
}

// Calculate mean from an array of objects with numeric values
function calculateMeanFromObjects(data: DataPoint[]): number {
    const values = data.map(item => item.value);
    return calculateMean(values);
}

// Usage
const dataPoints: DataPoint[] = [
    { value: 10, timestamp: new Date() },
    { value: 20, timestamp: new Date() },
    { value: 30, timestamp: new Date() }
];

const averageValue = calculateMeanFromObjects(dataPoints);
console.log(averageValue); // Output: 20
