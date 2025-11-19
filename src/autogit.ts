const array: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(array)];
// Result: [1, 2, 3, 4, 5]
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.filter((item, index) => array.indexOf(item) === index);
// Result: [1, 2, 3, 4, 5]
const array = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = array.reduce((acc: number[], current) => {
  return acc.includes(current) ? acc : [...acc, current];
}, []);
// Result: [1, 2, 3, 4, 5]
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "John" } // duplicate
];

const uniqueUsers = Array.from(
  new Map(users.map(user => [user.id, user])).values()
);
// Result: [{ id: 1, name: "John" }, { id: 2, name: "Jane" }]
const removeDuplicatesByKey = <T>(array: T[], key: keyof T): T[] => {
  return array.filter((item, index, self) => 
    index === self.findIndex(t => t[key] === item[key])
  );
};

const uniqueUsers = removeDuplicatesByKey(users, 'id');
function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// Usage
const numbers = removeDuplicates([1, 2, 2, 3]);
const strings = removeDuplicates(['a', 'b', 'b', 'c']);
