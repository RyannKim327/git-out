/**
 * Sorts an array using Bubble Sort algorithm
 * @param arr - The array to be sorted
 * @returns The sorted array
 */
function bubbleSort<T extends number | string>(arr: T[]): T[] {
    // Make a copy to avoid mutating the original array
    const sortedArray = [...arr];
    let n = sortedArray.length;
    let swapped: boolean;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Compare adjacent elements
            if (sortedArray[i] > sortedArray[i + 1]) {
                // Swap elements
                [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
                swapped = true;
            }
        }
        // After each pass, the largest element bubbles to the end
        n--;
    } while (swapped); // Continue until no swaps occur

    return sortedArray;
}

// Example usage:
const unsortedNumbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Unsorted:', unsortedNumbers);
const sortedNumbers = bubbleSort(unsortedNumbers);
console.log('Sorted:', sortedNumbers);

const unsortedStrings = ['banana', 'apple', 'orange', 'grape'];
console.log('Unsorted:', unsortedStrings);
const sortedStrings = bubbleSort(unsortedStrings);
console.log('Sorted:', sortedStrings);
