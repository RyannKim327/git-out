function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const sorted = [...arr].sort((a, b) => b - a);
    return sorted[1];
}

// Example usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargest(numbers)); // Output: 15
function findSecondLargestEfficient(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (const num of arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num !== largest) {
            secondLargest = num;
        }
    }
    
    return secondLargest !== -Infinity ? secondLargest : null;
}

// Example usage
console.log(findSecondLargestEfficient(numbers)); // Output: 15
function findSecondLargestUnique(arr: number[]): number | null {
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSorted.length >= 2 ? uniqueSorted[1] : null;
}

// Example with duplicates
const numbersWithDuplicates = [10, 10, 8, 20, 15, 20];
console.log(findSecondLargestUnique(numbersWithDuplicates)); // Output: 15
function findSecondLargestReduce(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const result = arr.reduce((acc, curr) => {
        if (curr > acc.largest) {
            acc.secondLargest = acc.largest;
            acc.largest = curr;
        } else if (curr > acc.secondLargest && curr !== acc.largest) {
            acc.secondLargest = curr;
        }
        return acc;
    }, { largest: -Infinity, secondLargest: -Infinity });
    
    return result.secondLargest !== -Infinity ? result.secondLargest : null;
}
function findSecondLargestSafe(arr: number[]): number | null {
    // Validate input
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length < 2) {
        return null;
    }
    
    // Handle non-number values
    const numericArray = arr.filter(item => typeof item === 'number');
    
    if (numericArray.length < 2) {
        return null;
    }
    
    let largest = -Infinity;
    let secondLargest = -Infinity;
    
    for (const num of numericArray) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num !== largest) {
            secondLargest = num;
        }
    }
    
    return secondLargest !== -Infinity ? secondLargest : null;
}
