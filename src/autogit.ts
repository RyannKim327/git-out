function longestIncreasingSubsequence(nums: number[]): number[] {
  if (nums.length === 0) return [];
  
  const tails: number[] = [];
  const predecessors: number[] = new Array(nums.length).fill(-1);
  const indices: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    
    // Binary search to find where to place current number
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[tails[mid]] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    if (left === tails.length) {
      tails.push(i);
    } else {
      tails[left] = i;
    }
    
    // Record predecessor for reconstruction
    if (left > 0) {
      predecessors[i] = tails[left - 1];
    }
  }
  
  // Reconstruct the LIS
  const lis: number[] = [];
  let current = tails[tails.length - 1];
  while (current !== -1) {
    lis.push(nums[current]);
    current = predecessors[current];
  }
  
  return lis.reverse();
}

// Example usage
const arr = [10, 9, 2, 5, 3, 7, 101, 18];
const result = longestIncreasingSubsequence(arr);
console.log(result); // [2, 3, 7, 18]
function lisLength(nums: number[]): number {
  const tails: number[] = [];
  
  for (const num of nums) {
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }
  
  return tails.length;
}
function longestIncreasingSubsequenceDP(nums: number[]): number[] {
  const n = nums.length;
  const dp: number[] = new Array(n).fill(1);
  const prev: number[] = new Array(n).fill(-1);
  
  let maxLength = 1;
  let maxIndex = 0;
  
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
        
        if (dp[i] > maxLength) {
          maxLength = dp[i];
          maxIndex = i;
        }
      }
    }
  }
  
  // Reconstruct the sequence
  const lis: number[] = [];
  let current = maxIndex;
  while (current !== -1) {
    lis.push(nums[current]);
    current = prev[current];
  }
  
  return lis.reverse();
}
interface LISResult {
  length: number;
  sequence: number[];
  indices: number[];
}

function findLongestIncreasingSubsequence(
  nums: number[],
  returnSequence: boolean = true
): LISResult {
  if (nums.length === 0) {
    return { length: 0, sequence: [], indices: [] };
  }
  
  const tails: number[] = [];
  const predecessors: number[] = new Array(nums.length).fill(-1);
  const tailIndices: number[] = [];
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    
    let left = 0, right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[tails[mid]] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    
    if (left === tails.length) {
      tails.push(i);
    } else {
      tails[left] = i;
    }
    
    if (left > 0) {
      predecessors[i] = tails[left - 1];
    }
  }
  
  const length = tails.length;
  
  if (!returnSequence) {
    return { length, sequence: [], indices: [] };
  }
  
  // Reconstruct sequence and indices
  const sequence: number[] = [];
  const indices: number[] = [];
  let current = tails[tails.length - 1];
  
  while (current !== -1) {
    sequence.unshift(nums[current]);
    indices.unshift(current);
    current = predecessors[current];
  }
  
  return { length, sequence, indices };
}

// Usage examples
const testArray = [3, 4, -1, 5, 8, 2, 3, 12, 7, 9, 10];

const result1 = findLongestIncreasingSubsequence(testArray);
console.log('LIS:', result1.sequence); // [-1, 2, 3, 7, 9, 10]
console.log('Length:', result1.length); // 6
console.log('Indices:', result1.indices); // [2, 5, 6, 8, 9, 10]

const result2 = findLongestIncreasingSubsequence(testArray, false);
console.log('Length only:', result2.length); // 6
// Helper function to validate input
function validateInput(nums: number[]): void {
  if (!Array.isArray(nums)) {
    throw new Error('Input must be an array');
  }
  if (nums.some(n => typeof n !== 'number')) {
    throw new Error('Array must contain only numbers');
  }
}

// Function to handle edge cases
function safeLIS(nums: number[]): number[] {
  try {
    validateInput(nums);
    return longestIncreasingSubsequence(nums);
  } catch (error) {
    console.error('Error:', error.message);
    return [];
  }
}
