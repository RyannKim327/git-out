const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
// Result: [1, 2, 3, 4, 5]

// With TypeScript types
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers: number[] = [...new Set(numbers)];
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.filter((item, index) => 
  arrayWithDuplicates.indexOf(item) === index
);
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.reduce((accumulator, current) => {
  if (!accumulator.includes(current)) {
    accumulator.push(current);
  }
  return accumulator;
}, [] as number[]);
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

// Alternative using Set with JSON (for simple objects)
const uniqueUsersByString = [...new Set(users.map(user => JSON.stringify(user)))].map(str => JSON.parse(str));
function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// Or with custom comparison for objects
function removeDuplicatesByKey<T>(array: T[], key: keyof T): T[] {
  return array.filter((item, index, self) => 
    index === self.findIndex(i => i[key] === item[key])
  );
}

// Usage
const numbers = removeDuplicates([1, 2, 2, 3, 4]);
const uniqueUsers = removeDuplicatesByKey(users, 'id');
