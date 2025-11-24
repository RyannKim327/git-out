const originalArray = [1, 2, 3, 4, 5];
const elementToRemove = 3;

const newArray = originalArray.filter(item => item !== elementToRemove);
console.log(newArray); // [1, 2, 4, 5]
const array = [1, 2, 3, 4, 5];
const elementToRemove = 3;

const index = array.indexOf(elementToRemove);
if (index > -1) {
    array.splice(index, 1);
}
console.log(array); // [1, 2, 4, 5]
const array = [1, 2, 3, 3, 4, 5];
const elementToRemove = 3;

let index = array.indexOf(elementToRemove);
while (index > -1) {
    array.splice(index, 1);
    index = array.indexOf(elementToRemove);
}
console.log(array); // [1, 2, 4, 5]
function removeElement<T>(array: T[], element: T): T[] {
    return array.filter(item => item !== element);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const result = removeElement(numbers, 3);
const array = [1, 2, 3, 4, 5];
const indexToRemove = 2;

// Using slice (immutable)
const newArray = [...array.slice(0, indexToRemove), ...array.slice(indexToRemove + 1)];

// Using splice (mutable)
array.splice(indexToRemove, 1);
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'}
];

// Remove user with id 2
const filteredUsers = users.filter(user => user.id !== 2);
