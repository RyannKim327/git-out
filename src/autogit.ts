const numbers = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Remove all occurrences of the element
const filteredArray = numbers.filter(item => item !== elementToRemove);
console.log(filteredArray); // [1, 2, 4, 5]

// For objects, use a specific property
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

const filteredUsers = users.filter(user => user.id !== 2);
console.log(filteredUsers); // [{ id: 1, name: 'John' }, { id: 3, name: 'Bob' }]
const fruits = ['apple', 'banana', 'orange', 'mango'];
const indexToRemove = fruits.indexOf('banana');

if (indexToRemove > -1) {
  fruits.splice(indexToRemove, 1);
}
console.log(fruits); // ['apple', 'orange', 'mango']
const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
const index = items.findIndex(item => item.id === 2);

if (index !== -1) {
  items.splice(index, 1);
}
console.log(items); // [{ id: 1 }, { id: 3 }]
function removeItem<T>(array: T[], item: T): T[] {
  return array.filter(element => element !== item);
}

// Or for objects with specific property matching
function removeItemById<T extends { id: number }>(array: T[], id: number): T[] {
  return array.filter(item => item.id !== id);
}
