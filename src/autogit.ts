function mergeSortIterative<T>(array: T[]): T[] {
    // Handle edge cases
    if (array.length <= 1) {
        return array;
    }

    // Create a working array to avoid modifying the original
    const result = [...array];
    const temp = new Array(array.length);
    
    // Start with subarrays of size 1, then double each time
    for (let size = 1; size < array.length; size *= 2) {
        // Merge adjacent subarrays
        for (let leftStart = 0; leftStart < array.length; leftStart += 2 * size) {
            const mid = Math.min(leftStart + size, array.length);
            const rightEnd = Math.min(leftStart + 2 * size, array.length);
            
            // Merge two subarrays: [leftStart...mid-1] and [mid...rightEnd-1]
            merge(result, temp, leftStart, mid, rightEnd);
        }
        
        // Copy the merged result back for the next iteration
        for (let i = 0; i < array.length; i++) {
            result[i] = temp[i];
        }
    }
    
    return result;
}

function merge<T>(
    array: T[], 
    temp: T[], 
    leftStart: number, 
    mid: number, 
    rightEnd: number
): void {
    let leftIndex = leftStart;
    let rightIndex = mid;
    let tempIndex = leftStart;
    
    // Merge the two arrays by comparing elements
    while (leftIndex < mid && rightIndex < rightEnd) {
        if (array[leftIndex] <= array[rightIndex]) {
            temp[tempIndex++] = array[leftIndex++];
        } else {
            temp[tempIndex++] = array[rightIndex++];
        }
    }
    
    // Copy remaining elements from left subarray
    while (leftIndex < mid) {
        temp[tempIndex++] = array[leftIndex++];
    }
    
    // Copy remaining elements from right subarray
    while (rightIndex < rightEnd) {
        temp[tempIndex++] = array[rightIndex++];
    }
}

// Example usage and testing
interface TestCase {
    input: number[];
    expected: number[];
}

const testCases: TestCase[] = [
    { input: [64, 34, 25, 12, 22, 11, 90], expected: [11, 12, 22, 25, 34, 64, 90] },
    { input: [5, 2, 3, 1], expected: [1, 2, 3, 5] },
    { input: [1], expected: [1] },
    { input: [], expected: [] },
    { input: [3, 3, 3], expected: [3, 3, 3] },
    { input: [5, 4], expected: [4, 5] }
];

// Run tests
console.log("Testing iterative merge sort:");
testCases.forEach((testCase, index) => {
    const result = mergeSortIterative(testCase.input);
    const isCorrect = JSON.stringify(result) === JSON.stringify(testCase.expected);
    console.log(`Test ${index + 1}: ${isCorrect ? "PASS" : "FAIL"}`);
    if (!isCorrect) {
        console.log(`  Input: [${testCase.input}]`);
        console.log(`  Expected: [${testCase.expected}]`);
        console.log(`  Got: [${result}]`);
    }
});

// Generic type example
const stringArray = ["banana", "apple", "cherry", "date"];
console.log("\nString array sorted:", mergeSortIterative(stringArray));
