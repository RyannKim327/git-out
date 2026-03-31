// Declare your array and annotate the type if you want extra safety
let numbers: number[] = [12, 4, 75, 3, 9];

// Sort in ascending order
numbers.sort((a, b) => a - b);

console.log(numbers); // [3, 4, 9, 12, 75]
const sorted = [...numbers].sort((a, b) => a - b);
numbers.sort((a, b) => b - a);
export function sortNumbers(nums: number[], order: 'asc' | 'desc' = 'asc'): number[] {
  const comparator = order === 'asc' ? (a: number, b: number) => a - b
                                    : (a: number, b: number) => b - a;
  // Return a new sorted array, leaving the input untouched
  return [...nums].sort(comparator);
}
