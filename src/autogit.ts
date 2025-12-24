function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example usage
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const commonElements = findCommonElements(array1, array2);
console.log(commonElements); // Output: [3, 4, 5]
function findCommonElementsWithSet<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

// Example usage
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const commonElements = findCommonElementsWithSet(array1, array2);
console.log(commonElements); // Output: [3, 4, 5]
interface User {
  id: number;
  name: string;
}

function findCommonUsers(users1: User[], users2: User[]): User[] {
  const userIds2 = new Set(users2.map(user => user.id));
  return users1.filter(user => userIds2.has(user.id));
}

// Example usage
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const users2 = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' }
];

const commonUsers = findCommonUsers(users1, users2);
console.log(commonUsers); 
// Output: [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
function findCommonElementsCustom<T>(
  arr1: T[], 
  arr2: T[], 
  comparator: (a: T, b: T) => boolean = (a, b) => a === b
): T[] {
  return arr1.filter(item1 => 
    arr2.some(item2 => comparator(item1, item2))
  );
}

// Example with custom comparator for objects
const commonUsers = findCommonElementsCustom(
  users1, 
  users2, 
  (a, b) => a.id === b.id
);
function findCommonElementsReduce<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.reduce((common, item) => {
    if (set2.has(item)) {
      common.push(item);
    }
    return common;
  }, [] as T[]);
}
function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

// Usage examples
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
console.log(intersection(numbers1, numbers2)); // [3, 4, 5]

const strings1 = ['apple', 'banana', 'orange'];
const strings2 = ['banana', 'orange', 'grape'];
console.log(intersection(strings1, strings2)); // ['banana', 'orange']
