function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error("Cannot calculate mean of empty array");
    }
    
    const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
    return sum / numbers.length;
}

// Example usage
const data: number[] = [1, 2, 3, 4, 5];
const mean = calculateMean(data);
console.log(mean); // Output: 3
function calculateMeanRobust(numbers: any[]): number {
    const validNumbers = numbers.filter(n => typeof n === 'number' && !isNaN(n));
    
    if (validNumbers.length === 0) {
        throw new Error("No valid numbers found in array");
    }
    
    const sum = validNumbers.reduce((acc, curr) => acc + curr, 0);
    return sum / validNumbers.length;
}
