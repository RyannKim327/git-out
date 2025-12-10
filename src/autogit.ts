const array = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Remove all occurrences of the element
const newArray = array.filter(item => item !== elementToRemove);
console.log(newArray); // [1, 2, 4, 5]
const array = [1, 2, 3, 4, 5];
const indexToRemove = 2; // Index of element '3'

// Remove element at specific index
array.splice(indexToRemove, 1);
console.log(array); // [1, 2, 4, 5]
const array = [1, 2, 3, 3, 4, 5];
const elementToRemove = 3;

const index = array.indexOf(elementToRemove);
if (index > -1) {
    array.splice(index, 1);
}
console.log(array); // [1, 2, 3, 4, 5] (only first '3' removed)
function removeElement<T>(array: T[], element: T): T[] {
    return array.filter(item => item !== element);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const result = removeElement(numbers, 3);
console.log(result); // [1, 2, 4, 5]
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

// Remove user with id 2
const filteredUsers = users.filter(user => user.id !== 2);
console.log(filteredUsers); // [{ id: 1, name: "Alice" }, { id: 3, name: "Charlie" }]
