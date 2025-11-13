function findSecondLargest(arr: number[]): number | null {
  if (arr.length < 2) return null;
  
  const sorted = [...arr].sort((a, b) => b - a); // Descending sort
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
  
  // Remove duplicates and sort
  const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
  
  if (uniqueSorted.length < 2) return null;
  return uniqueSorted[1];
}

// Usage with duplicates
const numbers = [10, 10, 8, 20, 15, 20];
console.log(findSecondLargest(numbers)); // 15
function findSecondLargest(arr: number[]): number | null {
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
function findSecondLargest(
  arr: number[], 
  handleDuplicates: boolean = false
): number | null {
  if (arr.length < 2) return null;
  
  if (handleDuplicates) {
    // Method that handles duplicates
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSorted.length >= 2 ? uniqueSorted[1] : null;
  } else {
    // Single pass method
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
}

// Test cases
console.log(findSecondLargest([10, 5, 8, 20, 15])); // 15
console.log(findSecondLargest([10, 10, 10])); // null
console.log(findSecondLargest([10, 10, 10], true)); // null
console.log(findSecondLargest([10, 10, 8, 20, 15], true)); // 15
