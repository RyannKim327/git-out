function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

// Example:
const arr1 = [1, 2, 3, 2];
const arr2 = [2, 3, 4];
console.log(findCommonElements(arr1, arr2)); // Output: [2, 3, 2] (duplicates preserved)
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const set = new Set(arr1); // Convert first array to Set for O(1) lookups
  return arr2.filter(item => set.has(item)); // Filter second array
}

// Example:
const arr1 = [1, 2, 3, 2];
const arr2 = [2, 3, 4, 2];
console.log(findCommonElements(arr1, arr2)); // Output: [2, 3, 2] (duplicates from arr2)
function findCommonUniqueElements<T>(arr1: T[], arr2: T[]): T[] {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  return [...set1].filter(item => set2.has(item));
}

// Example:
const arr1 = [1, 2, 3, 2];
const arr2 = [2, 3, 4, 2];
console.log(findCommonUniqueElements(arr1, arr2)); // Output: [2, 3]
interface User {
  id: number;
  name: string;
}

// Custom check using `find` (less efficient)
function findCommonUsers(arr1: User[], arr2: User[]): User[] {
  return arr1.filter(user1 => 
    arr2.some(user2 => user1.id === user2.id) // Compare by `id`
  );
}

// Efficient alternative for objects (using Set of IDs):
function findCommonUsersFast(arr1: User[], arr2: User[]): User[] {
  const ids = new Set(arr2.map(user => user.id));
  return arr1.filter(user => ids.has(user.id));
}
