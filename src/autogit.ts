function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => array2.includes(item));
}

// Example usage
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [3, 4, 5, 6, 7];
const common = findCommonElements(arr1, arr2); // [3, 4, 5]
function findCommonElementsWithSet<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return array1.filter(item => set2.has(item));
}

// Example usage
const commonElements = findCommonElementsWithSet(arr1, arr2); // [3, 4, 5]
interface User {
  id: number;
  name: string;
}

function findCommonObjects(
  array1: User[], 
  array2: User[], 
  key: keyof User = 'id'
): User[] {
  const ids = new Set(array2.map(item => item[key]));
  return array1.filter(item => ids.has(item[key]));
}

// Example usage
const users1 = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
const users2 = [{id: 1, name: 'John'}, {id: 3, name: 'Doe'}];
const commonUsers = findCommonObjects(users1, users2); // [{id: 1, name: 'John'}]
function findCommonElementsReduce<T>(array1: T[], array2: T[]): T[] {
  return array1.reduce((common, item) => {
    if (array2.includes(item) && !common.includes(item)) {
      common.push(item);
    }
    return common;
  }, [] as T[]);
}
// For unique common elements only
function findUniqueCommonElements<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return [...new Set(array1.filter(item => set2.has(item)))];
}
