// Remove by value
const numbers = [1, 2, 3, 4, 5];
const valueToRemove = 3;
const newNumbers = numbers.filter(item => item !== valueToRemove);
console.log(newNumbers); // [1, 2, 4, 5]

// Remove by index
const indexToRemove = 2;
const newNumbersByIndex = numbers.filter((_, index) => index !== indexToRemove);
console.log(newNumbersByIndex); // [1, 2, 4, 5]

// For complex objects
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const newUsers = users.filter(user => user.id !== 2);
console.log(newUsers); // [{ id: 1, name: "Alice" }, { id: 3, name: "Charlie" }]
// Remove by index
const numbers = [1, 2, 3, 4, 5];
const indexToRemove = 2;
numbers.splice(indexToRemove, 1); // Remove 1 element at index 2
console.log(numbers); // [1, 2, 4, 5]

// Remove by value
const fruits = ['apple', 'banana', 'orange', 'grape'];
const valueToRemove = 'banana';
const index = fruits.indexOf(valueToRemove);
if (index > -1) {
  fruits.splice(index, 1);
}
console.log(fruits); // ['apple', 'orange', 'grape']
const numbers = [1, 2, 3, 4, 5];

// Remove last element
const lastElement = numbers.pop();
console.log(numbers); // [1, 2, 3, 4]
console.log(lastElement); // 5

// Remove first element
const firstElement = numbers.shift();
console.log(numbers); // [2, 3, 4]
console.log(firstElement); // 1
const numbers = [1, 2, 3, 4, 5];
const indexToRemove = 2;

const [removed, ...rest] = [
  ...numbers.slice(0, indexToRemove),
  ...numbers.slice(indexToRemove + 1)
];

console.log(rest); // [1, 2, 4, 5]
// Generic remove by value function
function removeItem<T>(arr: T[], value: T): T[] {
  return arr.filter(item => item !== value);
}

// Generic remove by predicate function
function removeByPredicate<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(item => !predicate(item));
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const result1 = removeItem(numbers, 3);
const result2 = removeByPredicate(numbers, (n) => n > 3);
