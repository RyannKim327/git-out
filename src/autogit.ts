function majorityElement(nums: number[]): number {
    let count = 0;
    let candidate: number | null = null;

    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Verify it's actually majority (optional but recommended)
    const frequency = nums.filter(n => n === candidate).length;
    if (frequency > nums.length / 2) {
        return candidate!;
    }
    
    throw new Error("No majority element exists");
}

// Usage
const arr = [2, 2, 1, 1, 1, 2, 2];
console.log(majorityElement(arr)); // Output: 2
function majorityElementHashMap(nums: number[]): number {
    const frequencyMap = new Map<number, number>();
    const majorityThreshold = nums.length / 2;

    for (const num of nums) {
        const currentCount = frequencyMap.get(num) || 0;
        const newCount = currentCount + 1;
        
        if (newCount > majorityThreshold) {
            return num;
        }
        
        frequencyMap.set(num, newCount);
    }

    throw new Error("No majority element exists");
}
function majorityElementSorting(nums: number[]): number {
    nums.sort((a, b) => a - b);
    return nums[Math.floor(nums.length / 2)];
}
interface MajorityElementResult {
    element: number;
    frequency: number;
}

function findMajorityElement(nums: number[]): MajorityElementResult {
    if (nums.length === 0) {
        throw new Error("Array cannot be empty");
    }

    let count = 0;
    let candidate: number = nums[0];

    // Boyer-Moore Voting Algorithm
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }

    // Verification step
    const frequency = nums.filter(n => n === candidate).length;
    const majorityThreshold = nums.length / 2;

    if (frequency > majorityThreshold) {
        return {
            element: candidate,
            frequency: frequency
        };
    }

    throw new Error(`No majority element exists. Highest frequency: ${frequency}/${nums.length}`);
}

// Usage example
const testArray = [3, 3, 4, 2, 3, 3, 3, 4, 4];
try {
    const result = findMajorityElement(testArray);
    console.log(`Majority element: ${result.element} (appears ${result.frequency} times)`);
} catch (error) {
    console.error(error.message);
}
