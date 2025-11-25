function findMajorityElement<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;
    
    let candidate = arr[0];
    let count = 1;
    
    for (let i = 1; i < arr.length; i++) {
        if (count === 0) {
            candidate = arr[i];
            count = 1;
        } else if (arr[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    // Verify if candidate is actually majority
    const frequency = arr.filter(item => item === candidate).length;
    return frequency > arr.length / 2 ? candidate : null;
}
function findMajorityElementHashMap<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;
    
    const frequencyMap = new Map<T, number>();
    
    for (const item of arr) {
        const currentCount = frequencyMap.get(item) || 0;
        frequencyMap.set(item, currentCount + 1);
        
        // Early termination if majority found
        if (currentCount + 1 > arr.length / 2) {
            return item;
        }
    }
    
    return null;
}
function findMajorityElementSort<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;
    
    const sortedArr = [...arr].sort();
    const candidate = sortedArr[Math.floor(sortedArr.length / 2)];
    
    // Verify candidate
    const frequency = arr.filter(item => item === candidate).length;
    return frequency > arr.length / 2 ? candidate : null;
}
interface MajorityElementResult<T> {
    element: T | null;
    count: number;
    isMajority: boolean;
}

function findMajorityElementDetailed<T>(arr: T[]): MajorityElementResult<T> {
    if (arr.length === 0) {
        return { element: null, count: 0, isMajority: false };
    }
    
    // Boyer-Moore algorithm
    let candidate = arr[0];
    let count = 1;
    
    for (let i = 1; i < arr.length; i++) {
        if (count === 0) {
            candidate = arr[i];
            count = 1;
        } else if (arr[i] === candidate) {
            count++;
        } else {
            count--;
        }
    }
    
    // Count actual frequency
    const actualCount = arr.filter(item => item === candidate).length;
    const majorityThreshold = arr.length / 2;
    
    return {
        element: actualCount > majorityThreshold ? candidate : null,
        count: actualCount,
        isMajority: actualCount > majorityThreshold
    };
}
// Test cases
const testCases = [
    [2, 2, 1, 1, 1, 2, 2], // Majority: 2
    [3, 2, 3], // Majority: 3
    [1, 2, 3, 4, 5], // No majority
    ['a', 'b', 'a', 'a', 'c'], // Majority: 'a'
    [] // Empty array
];

testCases.forEach((arr, index) => {
    const result = findMajorityElement(arr);
    console.log(`Test ${index + 1}:`, arr, '→', result);
});

// With detailed results
const detailedResult = findMajorityElementDetailed([1, 2, 1, 1, 3]);
console.log('Detailed:', detailedResult);
