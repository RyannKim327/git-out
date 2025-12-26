const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
// Result: [1, 2, 3, 4, 5]
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.filter((item, index) => 
  arrayWithDuplicates.indexOf(item) === index
);
// Result: [1, 2, 3, 4, 5]
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.reduce((acc, current) => {
  if (!acc.includes(current)) {
    acc.push(current);
  }
  return acc;
}, [] as number[]);
// Result: [1, 2, 3, 4, 5]
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
  index === self.findIndex((u) => u.id === user.id)
);
// Result: Removes duplicate user with id: 1
function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// Or with key selector for objects
function removeDuplicatesByKey<T, K extends keyof T>(array: T[], key: K): T[] {
  return array.filter((item, index, self) =>
    index === self.findIndex((t) => t[key] === item[key])
  );
}

// Usage
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = removeDuplicates(numbers);

const users = [{id: 1, name: "John"}, {id: 1, name: "John"}];
const uniqueUsers = removeDuplicatesByKey(users, 'id');
