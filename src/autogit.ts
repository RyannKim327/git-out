function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example usage:
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
const common = findCommonElements(array1, array2); // Returns [3, 4]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}

// Example usage:
const array1 = ["apple", "banana", "orange"];
const array2 = ["banana", "grape", "orange"];
const common = findCommonElements(array1, array2); // Returns ["banana", "orange"]
