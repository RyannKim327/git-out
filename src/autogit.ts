function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example usage
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const common = findCommonElements(array1, array2); // [3, 4, 5]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.indexOf(item) !== -1);
}
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

// Example usage
const fruits1 = ['apple', 'banana', 'orange'];
const fruits2 = ['banana', 'grape', 'orange', 'pear'];
const commonFruits = findCommonElements(fruits1, fruits2); // ['banana', 'orange']
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set(arr1)].filter(item => arr2.includes(item));
}
interface User {
  id: number;
  name: string;
}

function findCommonUsers(users1: User[], users2: User[]): User[] {
  const ids2 = new Set(users2.map(user => user.id));
  return users1.filter(user => ids2.has(user.id));
}

// Example usage
const users1 = [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}];
const users2 = [{id: 2, name: 'Bob'}, {id: 3, name: 'Charlie'}];
const commonUsers = findCommonUsers(users1, users2); // [{id: 2, name: 'Bob'}]
// Generic version with type constraints
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

// For readonly arrays
function findCommonElements<T>(arr1: readonly T[], arr2: readonly T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}
