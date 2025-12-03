const numbers: number[] = [1, 2, 3, 4, 5];
const valueToRemove = 3;

// Remove all occurrences of the value
const filteredArray = numbers.filter(item => item !== valueToRemove);
console.log(filteredArray); // [1, 2, 4, 5]
const fruits: string[] = ['apple', 'banana', 'orange', 'grape'];
const indexToRemove = 2; // Remove 'orange'

// Remove at specific index
fruits.splice(indexToRemove, 1);
console.log(fruits); // ['apple', 'banana', 'grape']
const items: number[] = [1, 2, 3, 2, 4, 5];
const valueToRemove = 2;

const index = items.indexOf(valueToRemove);
if (index > -1) {
    items.splice(index, 1);
}
console.log(items); // [1, 3, 2, 4, 5]
// Remove last element
const lastElement = numbers.pop();

// Remove first element
const firstElement = numbers.shift();
function removeItem<T>(array: T[], item: T): T[] {
    return array.filter(element => element !== item);
}

// Usage
const result = removeItem([1, 2, 3, 4], 3);
console.log(result); // [1, 2, 4]
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// Remove user with id 2
const filteredUsers = users.filter(user => user.id !== 2);
console.log(filteredUsers); // [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]
