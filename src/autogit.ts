function interpolationSearch(
  sortedArray: number[],
  target: number
): number {
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high && target >= sortedArray[low] && target <= sortedArray[high]) {
    // Calculate position using interpolation formula
    const pos = Math.floor(
      low + 
      ((target - sortedArray[low]) * (high - low)) / 
      (sortedArray[high] - sortedArray[low])
    );

    if (sortedArray[pos] === target) {
      return pos; // Found the target
    }

    if (sortedArray[pos] < target) {
      low = pos + 1; // Search in the right subarray
    } else {
      high = pos - 1; // Search in the left subarray
    }
  }

  return -1; // Target not found
}
interface SearchResult {
  index: number;
  found: boolean;
  iterations?: number;
}

function interpolationSearch(
  sortedArray: number[],
  target: number,
  trackIterations: boolean = false
): SearchResult {
  // Validate inputs
  if (!Array.isArray(sortedArray) || sortedArray.length === 0) {
    return { index: -1, found: false, iterations: 0 };
  }

  let low = 0;
  let high = sortedArray.length - 1;
  let iterations = 0;

  // Early exit if target is outside array bounds
  if (target < sortedArray[low] || target > sortedArray[high]) {
    return { index: -1, found: false, iterations: 0 };
  }

  while (low <= high) {
    iterations++;

    // Important: Prevent division by zero
    if (sortedArray[high] === sortedArray[low]) {
      // All elements in current range are equal
      if (sortedArray[low] === target) {
        return { 
          index: low, 
          found: true, 
          ...(trackIterations && { iterations }) 
        };
      }
      return { 
        index: -1, 
        found: false, 
        ...(trackIterations && { iterations }) 
      };
    }

    // Calculate probe position using interpolation formula
    const pos = Math.floor(
      low + 
      ((target - sortedArray[low]) * (high - low)) / 
      (sortedArray[high] - sortedArray[low])
    );

    // Ensure position is within bounds
    if (pos < low || pos > high) {
      break;
    }

    if (sortedArray[pos] === target) {
      return { 
        index: pos, 
        found: true, 
        ...(trackIterations && { iterations }) 
      };
    }

    if (sortedArray[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return { 
    index: -1, 
    found: false, 
    ...(trackIterations && { iterations }) 
  };
}
interface Comparable {
  valueOf(): number;
}

function interpolationSearchGeneric<T extends Comparable>(
  sortedArray: T[],
  target: T
): number {
  let low = 0;
  let high = sortedArray.length - 1;

  while (low <= high) {
    const lowVal = sortedArray[low].valueOf();
    const highVal = sortedArray[high].valueOf();
    const targetVal = target.valueOf();

    if (targetVal < lowVal || targetVal > highVal) {
      break;
    }

    // Handle case where all values in range are equal
    if (highVal === lowVal) {
      return sortedArray[low] === target ? low : -1;
    }

    const pos = Math.floor(
      low + 
      ((targetVal - lowVal) * (high - low)) / 
      (highVal - lowVal)
    );

    if (sortedArray[pos] === target) {
      return pos;
    }

    if (sortedArray[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1;
}
// Example 1: Basic usage
const numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log(interpolationSearch(numbers, 50)); // Output: 4
console.log(interpolationSearch(numbers, 25)); // Output: -1

// Example 2: With detailed results
const result = interpolationSearch(numbers, 70, true);
console.log(result); 
// Output: { index: 6, found: true, iterations: 1 }

// Example 3: Generic version with custom objects
class Product implements Comparable {
  constructor(public price: number, public name: string) {}
  
  valueOf(): number {
    return this.price;
  }
}

const products = [
  new Product(10, "Apple"),
  new Product(25, "Banana"),
  new Product(50, "Orange"),
  new Product(100, "Grapes")
];

console.log(interpolationSearchGeneric(products, new Product(50, ""))); // Output: 2
function testInterpolationSearch(): void {
  const testArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  
  // Test cases
  const testCases = [
    { target: 7, expected: 3 },
    { target: 1, expected: 0 },
    { target: 19, expected: 9 },
    { target: 6, expected: -1 },
    { target: 0, expected: -1 },
    { target: 20, expected: -1 }
  ];

  for (const testCase of testCases) {
    const result = interpolationSearch(testArray, testCase.target);
    console.log(`Search for ${testCase.target}: ${result === testCase.expected ? 'PASS' : 'FAIL'}`);
  }

  // Performance comparison
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2);
  const target = 999998;
  
  console.time('Interpolation Search');
  const result = interpolationSearch(largeArray, target);
  console.timeEnd('Interpolation Search');
  console.log(`Found at index: ${result}`);
}

testInterpolationSearch();
