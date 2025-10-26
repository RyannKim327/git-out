function interpolationSearch(
  arr: number[],
  target: number,
  low: number = 0,
  high: number = arr.length - 1
): number {
  // Base case: element not found
  if (low > high || target < arr[low] || target > arr[high]) {
    return -1;
  }

  // Calculate position using interpolation formula
  const pos = low + Math.floor(
    ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
  );

  // Found the element
  if (arr[pos] === target) {
    return pos;
  }

  // Recursively search in appropriate subarray
  if (arr[pos] < target) {
    return interpolationSearch(arr, target, pos + 1, high);
  } else {
    return interpolationSearch(arr, target, low, pos - 1);
  }
}
function interpolationSearchIterative(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // Handle case when low and high are same
    if (low === high) {
      return arr[low] === target ? low : -1;
    }

    // Calculate position using interpolation formula
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    // Found the element
    if (arr[pos] === target) {
      return pos;
    }

    // Adjust search boundaries
    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  return -1;
}
function interpolationSearchGeneric<T>(
  arr: T[],
  target: T,
  getValue: (item: T) => number,
  low: number = 0,
  high: number = arr.length - 1
): number {
  if (low > high) return -1;

  const lowVal = getValue(arr[low]);
  const highVal = getValue(arr[high]);
  const targetVal = getValue(target);

  // Check bounds
  if (targetVal < lowVal || targetVal > highVal) {
    return -1;
  }

  // Calculate position
  const pos = low + Math.floor(
    ((targetVal - lowVal) * (high - low)) / (highVal - lowVal)
  );

  if (arr[pos] === target) {
    return pos;
  }

  if (getValue(arr[pos]) < targetVal) {
    return interpolationSearchGeneric(arr, target, getValue, pos + 1, high);
  } else {
    return interpolationSearchGeneric(arr, target, getValue, low, pos - 1);
  }
}

// Usage example with objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" }
];

const result = interpolationSearchGeneric(
  people,
  { id: 3, name: "Charlie" },
  (person: Person) => person.id
);
class InterpolationSearch {
  static search(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
      if (low === high) {
        return arr[low] === target ? low : -1;
      }

      const pos = low + Math.floor(
        ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
      );

      if (arr[pos] === target) {
        return pos;
      }

      if (arr[pos] < target) {
        low = pos + 1;
      } else {
        high = pos - 1;
      }
    }

    return -1;
  }
}

// Test the implementation
const testArray = [10, 12, 13, 16, 18, 19, 20, 21, 22, 23, 24, 33, 35, 42, 47];

console.log(InterpolationSearch.search(testArray, 18)); // Output: 4
console.log(InterpolationSearch.search(testArray, 33)); // Output: 11
console.log(InterpolationSearch.search(testArray, 50)); // Output: -1
