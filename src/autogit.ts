function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // or throw an error if you prefer
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Usage
const data = [1, 2, 3, 4, 5];
const mean = calculateMean(data);
console.log(mean); // 3
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error("Cannot calculate mean of empty array");
    }
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Usage with try-catch
try {
    const mean = calculateMean([10, 20, 30]);
    console.log(mean); // 20
} catch (error) {
    console.error(error.message);
}
class Statistics {
    static mean(numbers: number[]): number {
        if (numbers.length === 0) {
            return 0;
        }
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }
}

// Usage
const result = Statistics.mean([2, 4, 6, 8]);
console.log(result); // 5
const mean = (numbers: number[]): number => 
    numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b) / numbers.length;

// Usage
console.log(mean([5, 10, 15])); // 10
