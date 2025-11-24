const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
// Result: [1, 2, 3, 4, 5]
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.filter((item, index) => 
  arrayWithDuplicates.indexOf(item) === index
);
// Result: [1, 2, 3, 4, 5]
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.reduce((acc: number[], current) => {
  if (!acc.includes(current)) {
    acc.push(current);
  }
  return acc;
}, []);
// Result: [1, 2, 3, 4, 5]
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "John" }, // duplicate
];

// Remove duplicates based on ID
const uniqueUsers = users.filter((user, index, self) =>
  index === self.findIndex((u) => u.id === user.id)
);

// Alternative using Set with map
const uniqueUsers2 = Array.from(
  new Map(users.map(user => [user.id, user])).values()
);
function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// Usage
const numbers = removeDuplicates([1, 2, 2, 3, 4]);
const strings = removeDuplicates(["a", "b", "b", "c"]);
