function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example usage
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const commonElements = findCommonElements(array1, array2);
console.log(commonElements); // [3, 4, 5]
function findCommonElementsSet<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}

// Example usage
const commonElements = findCommonElementsSet(array1, array2);
console.log(commonElements); // [3, 4, 5]
function findCommonElementsReduce<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.reduce((common: T[], item) => {
    if (arr2.includes(item)) {
      common.push(item);
    }
    return common;
  }, []);
}
interface User {
  id: number;
  name: string;
}

function findCommonObjects(arr1: User[], arr2: User[]): User[] {
  return arr1.filter(item1 => 
    arr2.some(item2 => item2.id === item1.id)
  );
}

// Example usage
const users1 = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
const users2 = [{id: 2, name: 'Bob'}, {id: 3, name: 'Charlie'}];
const commonUsers = findCommonObjects(users1, users2);
console.log(commonUsers); // [{id: 2, name: 'Bob'}]
function findCommonElements<T>(
  arr1: T[], 
  arr2: T[], 
  comparator?: (a: T, b: T) => boolean
): T[] {
  if (comparator) {
    return arr1.filter(item1 => 
      arr2.some(item2 => comparator(item1, item2))
    );
  }
  
  const set = new Set(arr2);
  return arr1.filter(item => set.has(item));
}

// Usage with primitive types
const numbers1 = [1, 2, 3, 4];
const numbers2 = [3, 4, 5, 6];
const commonNumbers = findCommonElements(numbers1, numbers2);

// Usage with custom objects
const objects1 = [{id: 1}, {id: 2}];
const objects2 = [{id: 2}, {id: 3}];
const commonObjects = findCommonElements(
  objects1, 
  objects2, 
  (a, b) => a.id === b.id
);
