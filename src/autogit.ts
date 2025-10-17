function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }
    return sum / numbers.length;
}
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    let sum = 0;
    numbers.forEach(num => sum += num);
    return sum / numbers.length;
}
const calculateMean = (numbers: number[]): number => 
    numbers.length === 0 ? 0 : numbers.reduce((a, b) => a + b) / numbers.length;
function calculateMean(numbers: number[]): number {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    
    if (numbers.length === 0) return 0;
    
    // Filter out non-numeric values if needed
    const validNumbers = numbers.filter(num => typeof num === 'number' && !isNaN(num));
    
    if (validNumbers.length === 0) return 0;
    
    return validNumbers.reduce((a, b) => a + b) / validNumbers.length;
}
// Test cases
console.log(calculateMean([1, 2, 3, 4, 5])); // 3
console.log(calculateMean([10, 20, 30]));    // 20
console.log(calculateMean([]));              // 0
console.log(calculateMean([5]));             // 5
console.log(calculateMean([-1, 0, 1]));      // 0
