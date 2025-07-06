function secondLargest(arr: number[]): number | null {
    if (arr.length < 2) {
        return null; // Not enough elements
    }

    let largest = Number.NEGATIVE_INFINITY;
    let secondLargest = Number.NEGATIVE_INFINITY;

    for (const num of arr) {
        if (num > largest) {
            secondLargest = largest; // Update second largest
            largest = num; // Update largest
        } else if (num > secondLargest && num < largest) {
            secondLargest = num; // Update second largest
        }
    }

    return secondLargest === Number.NEGATIVE_INFINITY ? null : secondLargest;
}

// Example usage
const array = [10, 5, 3, 7, 8];
console.log(secondLargest(array)); // Output: 8
function secondLargest(arr: number[]): number | null {
    if (arr.length < 2) {
        return null; // Not enough elements
    }

    const uniqueArr = Array.from(new Set(arr)); // Remove duplicates
    uniqueArr.sort((a, b) => b - a); // Sort in descending order

    return uniqueArr.length < 2 ? null : uniqueArr[1]; // Return the second largest
}

// Example usage
const array = [10, 5, 3, 7, 8, 10];
console.log(secondLargest(array)); // Output: 8
function secondLargest(arr: number[]): number | null {
    if (arr.length < 2) {
        return null; // Not enough elements
    }

    const result = arr.reduce((acc, num) => {
        if (num > acc.largest) {
            acc.secondLargest = acc.largest;
            acc.largest = num;
        } else if (num > acc.secondLargest && num < acc.largest) {
            acc.secondLargest = num;
        }
        return acc;
    }, { largest: Number.NEGATIVE_INFINITY, secondLargest: Number.NEGATIVE_INFINITY });

    return result.secondLargest === Number.NEGATIVE_INFINITY ? null : result.secondLargest;
}

// Example usage
const array = [10, 5, 3, 7, 8];
console.log(secondLargest(array)); // Output: 8
