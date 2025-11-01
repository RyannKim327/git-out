function interpolationSearch(
  arr: number[],
  target: number
): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // Prevent division by zero
    if (arr[high] === arr[low]) {
      return arr[low] === target ? low : -1;
    }

    // Calculate position using interpolation formula
    const position = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    if (arr[position] === target) {
      return position;
    }

    if (arr[position] < target) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }

  return -1;
}
function interpolationSearchGeneric<T>(
  arr: T[],
  target: T,
  keySelector: (item: T) => number = (item) => Number(item)
): number {
  let low = 0;
  let high = arr.length - 1;
  
  const getValue = (index: number) => keySelector(arr[index]);

  while (low <= high) {
    const lowVal = getValue(low);
    const highVal = getValue(high);
    const targetVal = keySelector(target);

    if (targetVal < lowVal || targetVal > highVal) {
      break;
    }

    // Handle equal values at boundaries
    if (highVal === lowVal) {
      return lowVal === targetVal ? low : -1;
    }

    // Interpolation formula
    const position = low + Math.floor(
      ((targetVal - lowVal) * (high - low)) / (highVal - lowVal)
    );

    const positionVal = getValue(position);

    if (positionVal === targetVal) {
      return position;
    }

    if (positionVal < targetVal) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }

  return -1;
}
class InterpolationSearch {
  // Basic number array search
  static search(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
      if (arr[high] === arr[low]) {
        return arr[low] === target ? low : -1;
      }

      const position = this.calculatePosition(arr, low, high, target);

      if (arr[position] === target) {
        return position;
      }

      if (arr[position] < target) {
        low = position + 1;
      } else {
        high = position - 1;
      }
    }

    return -1;
  }

  private static calculatePosition(
    arr: number[], 
    low: number, 
    high: number, 
    target: number
  ): number {
    return low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
  }

  // Generic search with custom key extraction
  static searchGeneric<T>(
    arr: T[],
    target: T,
    keyExtractor: (item: T) => number = (item) => Number(item)
  ): number {
    let low = 0;
    let high = arr.length - 1;
    
    const getKey = (index: number) => keyExtractor(arr[index]);
    const targetKey = keyExtractor(target);

    while (low <= high) {
      const lowKey = getKey(low);
      const highKey = getKey(high);

      if (targetKey < lowKey || targetKey > highKey) {
        break;
      }

      if (highKey === lowKey) {
        return lowKey === targetKey ? low : -1;
      }

      const position = low + Math.floor(
        ((targetKey - lowKey) * (high - low)) / (highKey - lowKey)
      );

      const positionKey = getKey(position);

      if (positionKey === targetKey) {
        return position;
      }

      if (positionKey < targetKey) {
        low = position + 1;
      } else {
        high = position - 1;
      }
    }

    return -1;
  }
}

// Usage Examples
const numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const objects = [
  { id: 10, name: "Alice" },
  { id: 20, name: "Bob" },
  { id: 30, name: "Charlie" }
];

// Search in number array
console.log(InterpolationSearch.search(numbers, 50)); // 4

// Search in object array using custom key
console.log(
  InterpolationSearch.searchGeneric(
    objects, 
    { id: 20, name: "Bob" }, 
    item => item.id
  )
); // 1

// Edge case: Empty array
console.log(InterpolationSearch.search([], 5)); // -1

// Edge case: Target not in range
console.log(InterpolationSearch.search(numbers, 5)); // -1
// Benchmark comparison
function benchmarkSearch(): void {
  const largeArray = Array.from({ length: 1000000 }, (_, i) => i * 2); // Even numbers
  
  console.time('Interpolation Search');
  const result1 = InterpolationSearch.search(largeArray, 500000);
  console.timeEnd('Interpolation Search');
  
  console.time('Binary Search');
  const result2 = largeArray.indexOf(500000);
  console.timeEnd('Binary Search');
  
  console.log(`Results: ${result1}, ${result2}`);
}
