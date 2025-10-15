function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const sorted = [...arr].sort((a, b) => b - a);
    return sorted[1];
}

// Usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargest(numbers)); // Output: 15
function findSecondLargest(arr: number[]): number | null {
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

// Usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargest(numbers)); // Output: 15
function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSorted.length >= 2 ? uniqueSorted[1] : null;
}

// Usage with duplicates
const numbers = [10, 10, 5, 8, 20, 20, 15];
console.log(findSecondLargest(numbers)); // Output: 15
function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const result = arr.reduce((acc, num) => {
        if (num > acc.largest) {
            acc.secondLargest = acc.largest;
            acc.largest = num;
        } else if (num > acc.secondLargest && num !== acc.largest) {
            acc.secondLargest = num;
        }
        return acc;
    }, { largest: -Infinity, secondLargest: -Infinity });
    
    return result.secondLargest !== -Infinity ? result.secondLargest : null;
}
function findSecondLargest(arr: number[]): number | null {
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

// Test cases
console.log(findSecondLargest([10, 5, 8, 20, 15]));      // 15
console.log(findSecondLargest([10, 10, 10]));            // null (all same)
console.log(findSecondLargest([5]));                     // null (too short)
console.log(findSecondLargest([-5, -2, -10, -1]));      // -2
console.log(findSecondLargest([1, 2, 3, 4, 5, 5]));     // 4 (handles duplicates)
