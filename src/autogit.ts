function secondLargest(arr: number[]): number | null {
    // Remove duplicates
    const uniqueArr = Array.from(new Set(arr));
    
    // Sort in descending order
    uniqueArr.sort((a, b) => b - a);
    
    // Return the second largest element
    return uniqueArr.length > 1 ? uniqueArr[1] : null;
}

// Example usage:
const numbers = [3, 1, 4, 4, 5, 2];
console.log(secondLargest(numbers)); // Output: 4
function secondLargest(arr: number[]): number | null {
    let first = -Infinity;
    let second = -Infinity;

    for (const num of arr) {
        if (num > first) {
            second = first; // Update second largest
            first = num;    // Update largest
        } else if (num > second && num !== first) {
            second = num;   // Update second largest if it's not equal to first
        }
    }

    return second === -Infinity ? null : second; // Return null if no second largest found
}

// Example usage:
const numbers = [3, 1, 4, 4, 5, 2];
console.log(secondLargest(numbers)); // Output: 4
function secondLargest(arr: number[]): number | null {
    const result = arr.reduce(
        (acc, num) => {
            if (num > acc.first) {
                acc.second = acc.first; // Update second largest
                acc.first = num;         // Update largest
            } else if (num > acc.second && num !== acc.first) {
                acc.second = num;        // Update second largest
            }
            return acc;
        },
        { first: -Infinity, second: -Infinity }
    );

    return result.second === -Infinity ? null : result.second; // Return null if no second largest found
}

// Example usage:
const numbers = [3, 1, 4, 4, 5, 2];
console.log(secondLargest(numbers)); // Output: 4
