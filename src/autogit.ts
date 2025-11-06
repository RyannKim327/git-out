function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => array2.includes(item));
}

// Example:
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const common = findCommonElements(arr1, arr2); // Result: [3, 4]
function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return array1.filter(item => set2.has(item));
}

// Example:
const arr1 = [1, 2, 2, 3];
const arr2 = [2, 3, 4];
const common = findCommonElements(arr1, arr2); // Result: [2, 2, 3]
const uniqueCommon = [...new Set(common)]; // For [2, 2, 3] → [2, 3]
function findCommonElements<T>(array1: T[], array2: T[]): T[] {
  const set2 = new Set(array2);
  return array1.filter(item => set2.has(item));
}

// For objects, use a custom approach:
interface User { id: number; name: string; }
const users1: User[] = [{ id: 1, name: "Alice" }];
const users2: User[] = [{ id: 1, name: "Alice" }];

// ⚠️ Fails because objects are compared by reference!
const commonUsers = findCommonElements(users1, users2); // []

// Workaround: Compare by a unique property (e.g., `id`)
const userIds2 = new Set(users2.map(user => user.id));
const commonUsersById = users1.filter(user => userIds2.has(user.id)); // Works ✅
