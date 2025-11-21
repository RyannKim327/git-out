/**
 * Calculates the mean (average) of a list of numbers.
 *
 * @param numbers An array of numbers.
 * @returns The mean of the numbers, or NaN if the array is empty.
 */
function calculateMean(numbers: number[]): number {
  if (numbers.length === 0) {
    // Returning NaN (Not-a-Number) is a common practice for
    // mathematically undefined operations like division by zero,
    // which effectively happens here.
    // Alternatively, you could throw an error: throw new Error("Cannot calculate mean of an empty array.");
    // Or return 0 if that's acceptable in your specific context (less mathematically correct).
    return NaN;
  }

  // Use reduce to sum all numbers in the array
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // Divide the sum by the count of numbers
  return sum / numbers.length;
}

// --- Examples ---

const myNumbers1 = [10, 20, 30, 40, 50];
const mean1 = calculateMean(myNumbers1);
console.log(`Mean of [${myNumbers1}]: ${mean1}`); // Output: Mean of [10,20,30,40,50]: 30

const myNumbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mean2 = calculateMean(myNumbers2);
console.log(`Mean of [${myNumbers2}]: ${mean2}`); // Output: Mean of [1,2,3,4,5,6,7,8,9,10]: 5.5

const singleNumber = [7];
const meanSingle = calculateMean(singleNumber);
console.log(`Mean of [${singleNumber}]: ${meanSingle}`); // Output: Mean of [7]: 7

const emptyArray: number[] = [];
const meanEmpty = calculateMean(emptyArray);
console.log(`Mean of []: ${meanEmpty}`); // Output: Mean of []: NaN

const negativeNumbers = [-5, -10, 0, 5];
const meanNegative = calculateMean(negativeNumbers);
console.log(`Mean of [${negativeNumbers}]: ${meanNegative}`); // Output: Mean of [-5,-10,0,5]: -2.5
/**
 * Calculates the mean (average) of a list of numbers using a for loop.
 *
 * @param numbers An array of numbers.
 * @returns The mean of the numbers, or NaN if the array is empty.
 */
function calculateMeanWithForLoop(numbers: number[]): number {
  if (numbers.length === 0) {
    return NaN;
  }

  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }

  return sum / numbers.length;
}

// --- Example ---
const myNumbersLoop = [10, 20, 30];
const meanLoop = calculateMeanWithForLoop(myNumbersLoop);
console.log(`Mean (for loop) of [${myNumbersLoop}]: ${meanLoop}`); // Output: Mean (for loop) of [10,20,30]: 20
