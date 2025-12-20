function majorityElement(nums: number[]): number | null {
    let candidate: number | null = null;
    let count = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    // Verify if the candidate is actually the majority element
    if (candidate !== null) {
        const frequency = nums.filter(n => n === candidate).length;
        return frequency > nums.length / 2 ? candidate : null;
    }
    
    return null;
}

// Example usage
console.log(majorityElement([3, 2, 3])); // 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); // 2
console.log(majorityElement([1, 2, 3])); // null
function majorityElementHashMap(nums: number[]): number | null {
    const countMap = new Map<number, number>();
    const majorityCount = Math.floor(nums.length / 2);
    
    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
        if (countMap.get(num)! > majorityCount) {
            return num;
        }
    }
    
    return null;
}
function majorityElementSorting(nums: number[]): number | null {
    nums.sort((a, b) => a - b);
    const candidate = nums[Math.floor(nums.length / 2)];
    
    // Verify the candidate
    const frequency = nums.filter(n => n === candidate).length;
    return frequency > nums.length / 2 ? candidate : null;
}
function majorityElementGeneric<T>(nums: T[]): T | null {
    if (nums.length === 0) return null;
    
    let candidate: T = nums[0];
    let count = 0;
    
    for (const num of nums) {
        if (count === 0) {
            candidate = num;
        }
        count += (num === candidate) ? 1 : -1;
    }
    
    // Verification
    const frequency = nums.filter(n => n === candidate).length;
    return frequency > nums.length / 2 ? candidate : null;
}

// Example with different types
console.log(majorityElementGeneric(['a', 'b', 'a', 'a'])); // 'a'
console.log(majorityElementGeneric([true, false, true])); // true
function testMajorityElement() {
    const testCases = [
        { input: [3, 2, 3], expected: 3 },
        { input: [2, 2, 1, 1, 1, 2, 2], expected: 2 },
        { input: [1, 2, 3], expected: null },
        { input: [1], expected: 1 },
        { input: [1, 1, 2, 2, 2], expected: 2 },
    ];
    
    for (const testCase of testCases) {
        const result = majorityElement(testCase.input);
        console.log(`Input: [${testCase.input}] -> Expected: ${testCase.expected}, Got: ${result}`);
    }
}

testMajorityElement();
