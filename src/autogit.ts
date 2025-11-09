// Remove by value
const numbers = [1, 2, 3, 4, 5];
const valueToRemove = 3;
const filteredNumbers = numbers.filter(item => item !== valueToRemove);
console.log(filteredNumbers); // [1, 2, 4, 5]

// Remove by condition
const filteredNumbers2 = numbers.filter(item => item > 2);
console.log(filteredNumbers2); // [3, 4, 5]
const fruits = ['apple', 'banana', 'orange', 'grape'];

// Remove by index
const indexToRemove = 1; // Remove 'banana'
fruits.splice(indexToRemove, 1);
console.log(fruits); // ['apple', 'orange', 'grape']

// Remove by finding index first
const fruitToRemove = 'orange';
const fruitIndex = fruits.indexOf(fruitToRemove);
if (fruitIndex > -1) {
    fruits.splice(fruitIndex, 1);
}
console.log(fruits); // ['apple', 'grape']
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' }
];

// Remove user by id
const userIdToRemove = 2;
const filteredUsers = users.filter(user => user.id !== userIdToRemove);
console.log(filteredUsers);
// [{ id: 1, name: 'John' }, { id: 3, name: 'Bob' }]
function removeItem<T>(array: T[], item: T): T[] {
    return array.filter(arrayItem => arrayItem !== item);
}

function removeItemByIndex<T>(array: T[], index: number): T[] {
    return array.filter((_, i) => i !== index);
}

// Usage
const items = [1, 2, 3, 4, 5];
const result1 = removeItem(items, 3); // [1, 2, 4, 5]
const result2 = removeItemByIndex(items, 2); // [1, 2, 4, 5]
const numbers = [1, 2, 3, 2, 4, 2, 5];
const valueToRemove = 2;

// Remove all occurrences
const result = numbers.filter(item => item !== valueToRemove);
console.log(result); // [1, 3, 4, 5]

// Remove only first occurrence
const firstIndex = numbers.indexOf(valueToRemove);
if (firstIndex > -1) {
    numbers.splice(firstIndex, 1);
}
console.log(numbers); // [1, 3, 2, 4, 2, 5]
