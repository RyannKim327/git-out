function getDigit(num: number, place: number): number {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num: number): number {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums: number[]): number {
  let maxDigits = 0;
  for (let num of nums) {
    maxDigits = Math.max(maxDigits, digitCount(num));
  }
  return maxDigits;
}

function radixSort(nums: number[]): number[] {
  const maxDigitCount = mostDigits(nums);
  
  for (let k = 0; k < maxDigitCount; k++) {
    const digitBuckets: number[][] = Array.from({ length: 10 }, () => []);
    
    for (let num of nums) {
      const digit = getDigit(num, k);
      digitBuckets[digit].push(num);
    }
    
    nums = ([] as number[]).concat(...digitBuckets);
  }
  
  return nums;
}

// Usage example
const numbers = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Original:", numbers);
console.log("Sorted:", radixSort(numbers));
// Output: [2, 24, 45, 66, 75, 90, 170, 802]
function stringRadixSort(strings: string[]): string[] {
  if (strings.length === 0) return strings;
  
  // Find the maximum string length
  const maxLength = Math.max(...strings.map(str => str.length));
  
  for (let pos = maxLength - 1; pos >= 0; pos--) {
    const buckets: string[][] = Array.from({ length: 256 }, () => []);
    
    for (let str of strings) {
      const charCode = pos < str.length ? str.charCodeAt(pos) : 0;
      buckets[charCode].push(str);
    }
    
    strings = ([] as string[]).concat(...buckets);
  }
  
  return strings;
}

// Usage example
const words = ["cat", "dog", "apple", "banana", "bat", "ball"];
console.log("Original:", words);
console.log("Sorted:", stringRadixSort(words));
// Output: ["apple", "ball", "banana", "bat", "cat", "dog"]
interface RadixConfig {
  getDigit: (item: any, position: number) => number;
  maxDigits: (items: any[]) => number;
  base?: number;
}

class RadixSorter {
  static forNumbers(): RadixConfig {
    return {
      getDigit: (num: number, place: number) => {
        return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
      },
      maxDigits: (nums: number[]) => {
        return Math.max(...nums.map(num => 
          num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1
        ));
      },
      base: 10
    };
  }
  
  static forStrings(): RadixConfig {
    return {
      getDigit: (str: string, position: number) => {
        return position < str.length ? str.charCodeAt(str.length - 1 - position) : 0;
      },
      maxDigits: (strings: string[]) => {
        return Math.max(...strings.map(str => str.length));
      },
      base: 256
    };
  }
  
  static sort<T>(items: T[], config: RadixConfig): T[] {
    const maxDigits = config.maxDigits(items);
    const base = config.base || 10;
    
    for (let position = 0; position < maxDigits; position++) {
      const buckets: T[][] = Array.from({ length: base }, () => []);
      
      for (let item of items) {
        const digit = config.getDigit(item, position);
        buckets[digit].push(item);
      }
      
      items = ([] as T[]).concat(...buckets);
    }
    
    return items;
  }
  
  static sortNumbers(nums: number[], supportNegatives = false): number[] {
    if (!supportNegatives) {
      return this.sort(nums, this.forNumbers());
    }
    
    // Handle negative numbers by separating and sorting separately
    const negatives = nums.filter(n => n < 0).map(n => Math.abs(n));
    const nonNegatives = nums.filter(n => n >= 0);
    
    const sortedNegatives = this.sort(negatives, this.forNumbers())
      .reverse()
      .map(n => -n);
    const sortedNonNegatives = this.sort(nonNegatives, this.forNumbers());
    
    return [...sortedNegatives, ...sortedNonNegatives];
  }
  
  static sortStrings(strings: string[]): string[] {
    return this.sort(strings, this.forStrings());
  }
}

// Usage examples
const numbersWithNegatives = [170, -45, 75, -90, 802, 24, -2, 66];
console.log("With negatives:", RadixSorter.sortNumbers(numbersWithNegatives, true));
// Output: [-90, -45, -2, 24, 66, 75, 170, 802]

const strings = ["zebra", "apple", "banana", "cherry"];
console.log("Strings:", RadixSorter.sortStrings(strings));
// Output: ["apple", "banana", "cherry", "zebra"]
