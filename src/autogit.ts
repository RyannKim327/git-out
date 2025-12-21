function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example usage
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const common = findCommonElements(array1, array2);
console.log(common); // [3, 4, 5]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

// Example usage
const array1 = ['apple', 'banana', 'orange'];
const array2 = ['banana', 'grape', 'orange', 'pear'];
const common = findCommonElements(array1, array2);
console.log(common); // ['banana', 'orange']
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.reduce((common, item) => {
    if (arr2.includes(item) && !common.includes(item)) {
      common.push(item);
    }
    return common;
  }, [] as T[]);
}
interface User {
  id: number;
  name: string;
}

function findCommonObjects<T>(
  arr1: T[], 
  arr2: T[], 
  comparator: (a: T, b: T) => boolean = (a, b) => a === b
): T[] {
  return arr1.filter(item1 => 
    arr2.some(item2 => comparator(item1, item2))
  );
}

// Example usage with objects
const users1: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const users2: User[] = [
  { id: 2, name: 'Bob' },
  { id: 4, name: 'David' },
  { id: 3, name: 'Charlie' }
];

const commonUsers = findCommonObjects(users1, users2, (a, b) => a.id === b.id);
console.log(commonUsers); 
// [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
function findCommonUniqueElements<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  const commonSet = new Set(arr1.filter(item => set2.has(item)));
  return Array.from(commonSet);
}

// Example usage
const array1 = [1, 2, 2, 3, 4, 4];
const array2 = [2, 3, 3, 5, 6];
const common = findCommonUniqueElements(array1, array2);
console.log(common); // [2, 3] (no duplicates)
