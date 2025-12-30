const array1: number[] = [1, 2, 3, 4, 5];
const array2: number[] = [3, 4, 5, 6, 7];

const commonElements = array1.filter(element => array2.includes(element));
console.log(commonElements); // [3, 4, 5]
const array1: number[] = [1, 2, 3, 4, 5];
const array2: number[] = [3, 4, 5, 6, 7];

const set2 = new Set(array2);
const commonElements = array1.filter(element => set2.has(element));
console.log(commonElements); // [3, 4, 5]
const array1: number[] = [1, 2, 3, 4, 5];
const array2: number[] = [3, 4, 5, 6, 7];

const commonElements = array1.reduce((acc, element) => {
  if (array2.includes(element)) {
    acc.push(element);
  }
  return acc;
}, [] as number[]);
console.log(commonElements); // [3, 4, 5]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(element => set2.has(element));
}

// Usage
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
const commonNumbers = findCommonElements(numbers1, numbers2);

const strings1 = ['apple', 'banana', 'cherry'];
const strings2 = ['banana', 'date', 'cherry', 'elderberry'];
const commonStrings = findCommonElements(strings1, strings2);
interface User {
  id: number;
  name: string;
}

const users1: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const users2: User[] = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' }
];

// Find common users by id
const commonUsers = users1.filter(user1 => 
  users2.some(user2 => user2.id === user1.id)
);
function intersection<T>(...arrays: T[][]): T[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];
  
  const set = new Set(arrays[0]);
  return arrays[1].filter(element => set.has(element));
}

// Usage with multiple arrays
const result = intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]);
console.log(result); // [3]
