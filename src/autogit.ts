function shellSort<T>(array: T[]): T[] {
  const n = array.length;
  let gap = Math.floor(n / 2);
  
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;
      
      // Shift elements until correct position is found
      while (j >= gap && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }
      
      array[j] = temp;
    }
    
    gap = Math.floor(gap / 2);
  }
  
  return array;
}
function shellSort<T>(
  array: T[],
  compareFn: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
): T[] {
  const n = array.length;
  let gap = Math.floor(n / 2);
  
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;
      
      while (j >= gap && compareFn(array[j - gap], temp) > 0) {
        array[j] = array[j - gap];
        j -= gap;
      }
      
      array[j] = temp;
    }
    
    gap = Math.floor(gap / 2);
  }
  
  return array;
}
// Example 1: Sorting numbers
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log('Sorted numbers:', shellSort(numbers));

// Example 2: Sorting strings
const strings = ['banana', 'apple', 'cherry', 'date'];
console.log('Sorted strings:', shellSort(strings));

// Example 3: Custom comparator for objects
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: 'John', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

const sortedByAge = shellSort(people, (a, b) => a.age - b.age);
console.log('Sorted by age:', sortedByAge);
function shellSortWithCustomGap<T>(array: T[]): T[] {
  const n = array.length;
  
  // Using Knuth's sequence: 1, 4, 13, 40, 121, ...
  let gap = 1;
  while (gap < n / 3) {
    gap = 3 * gap + 1;
  }
  
  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;
      
      while (j >= gap && array[j - gap] > temp) {
        array[j] = array[j - gap];
        j -= gap;
      }
      
      array[j] = temp;
    }
    
    gap = Math.floor((gap - 1) / 3);
  }
  
  return array;
}
// Shell sort has time complexity between O(n log n) and O(n²)
// depending on the gap sequence used

// Space complexity: O(1) - it's an in-place sorting algorithm
function testShellSort(): void {
  // Test with various inputs
  const testCases = [
    [5, 2, 8, 1, 9],
    [1],
    [],
    [3, 3, 3],
    [9, 8, 7, 6, 5, 4, 3, 2, 1]
  ];
  
  testCases.forEach((testCase, index) => {
    const sorted = shellSort([...testCase]);
    console.log(`Test ${index + 1}:`, sorted);
  });
}

// Run tests
testShellSort();
