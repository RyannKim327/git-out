function calculateMean(numbers: number[]): number | null {
    if (numbers.length === 0) {
        return null; // or throw an error, depending on your needs
    }
    
    const sum = numbers.reduce((acc, current) => acc + current, 0);
    return sum / numbers.length;
}

// Usage
const numbers: number[] = [1, 2, 3, 4, 5];
const mean = calculateMean(numbers);
console.log(mean); // Output: 3
function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error("Cannot calculate mean of empty array");
    }
    
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

// Usage
const mean = calculateMean([10, 20, 30, 40]); // 25
function calculateMean(numbers: number[]): number | null {
    if (numbers.length === 0) {
        return null;
    }
    
    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }
    
    return sum / numbers.length;
}
interface NumberList {
    values?: number[];
}

function calculateMeanFromObject(data: NumberList): number | null {
    const numbers = data.values || [];
    
    if (numbers.length === 0) {
        return null;
    }
    
    return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

// Usage
const data = { values: [5, 10, 15] };
const mean = calculateMeanFromObject(data); // 10
