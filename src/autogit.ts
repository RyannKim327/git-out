// Simple array (primitives)
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = Array.from(new Set(numbers));
// or
const uniqueNumbers2 = [...new Set(numbers)];

console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = numbers.filter((item, index) => numbers.indexOf(item) === index);

console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = numbers.reduce((acc: number[], current) => {
  if (!acc.includes(current)) {
    acc.push(current);
  }
  return acc;
}, []);

console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "John" }, // duplicate
  { id: 3, name: "Bob" }
];

// Remove duplicates based on id property
const uniqueUsers = users.filter((user, index, self) => 
  index === self.findIndex(u => u.id === user.id)
);

console.log(uniqueUsers);
// [{ id: 1, name: "John" }, { id: 2, name: "Jane" }, { id: 3, name: "Bob" }]
const uniqueUsers = Array.from(
  new Map(users.map(user => [user.id, user])).values()
);
function removeDuplicates<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// For objects with a key
function removeDuplicatesByKey<T, K extends keyof T>(array: T[], key: K): T[] {
  return Array.from(
    new Map(array.map(item => [item[key], item])).values()
  );
}

// Usage
const numbers = removeDuplicates([1, 2, 2, 3, 4, 4, 5]);
const uniqueUsers = removeDuplicatesByKey(users, 'id');
