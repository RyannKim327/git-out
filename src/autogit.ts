function calculateMean(numbers: number[]): number {
    if (numbers.length === 0) {
        return 0; // Handle empty array case to avoid division by zero
    }
    const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / numbers.length;
}
const data = [10, 20, 30, 40, 50];
const mean = calculateMean(data); // Returns 30 (150 ÷ 5)

const emptyData: number[] = [];
const emptyMean = calculateMean(emptyData); // Returns 0
