function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const sorted = [...arr].sort((a, b) => b - a); // Descending order
    return sorted[1];
}

// Usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargest(numbers)); // 15
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
console.log(findSecondLargest(numbers)); // 15
function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSorted.length > 1 ? uniqueSorted[1] : null;
}

// Usage
const numbers = [10, 10, 5, 8, 20, 15, 20];
console.log(findSecondLargest(numbers)); // 15
function findSecondLargest(arr: number[]): number | null {
    if (arr.length < 2) return null;
    
    const [largest, secondLargest] = arr.reduce(
        ([max, second], current) => {
            if (current > max) {
                return [current, max];
            } else if (current > second && current !== max) {
                return [max, current];
            }
            return [max, second];
        },
        [-Infinity, -Infinity]
    );
    
    return secondLargest !== -Infinity ? secondLargest : null;
}

// Usage
const numbers = [10, 5, 8, 20, 15];
console.log(findSecondLargest(numbers)); // 15
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
console.log(findSecondLargest([10, 5, 8, 20, 15])); // 15
console.log(findSecondLargest([10, 10, 10]));       // null (all same)
console.log(findSecondLargest([5]));                // null (too short)
console.log(findSecondLargest([-3, -1, -2]));      // -2
