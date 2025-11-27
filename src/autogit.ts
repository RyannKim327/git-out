const array1: number[] = [1, 2, 3, 4];
const array2: number[] = [3, 4, 5, 6];

const commonElements = array1.filter(value => array2.includes(value));
console.log(commonElements); // Output: [3, 4]
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];

const set2 = new Set(array2);
const commonElements = array1.filter(value => set2.has(value));
console.log(commonElements); // Output: [3, 4]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}

// Example usage
const numbers1 = [1, 2, 3, 4];
const numbers2 = [3, 4, 5, 6];
const result = findCommonElements(numbers1, numbers2); // [3, 4]

const strings1 = ["apple", "banana"];
const strings2 = ["banana", "cherry"];
const stringResult = findCommonElements(strings1, strings2); // ["banana"]
