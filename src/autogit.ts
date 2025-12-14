const numbers: number[] = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Returns new array without the element
const newArray = numbers.filter(item => item !== elementToRemove);
console.log(newArray); // [1, 2, 4, 5]
const numbers: number[] = [1, 2, 3, 4, 5];
const elementToRemove = 3;

const index = numbers.indexOf(elementToRemove);
if (index > -1) {
    numbers.splice(index, 1);
}
console.log(numbers); // [1, 2, 4, 5]
const numbers: number[] = [1, 2, 3, 4, 5];

// Remove element at index 2
numbers.splice(2, 1);
console.log(numbers); // [1, 2, 4, 5]
const numbers: number[] = [1, 2, 3, 2, 4, 2, 5];
const elementToRemove = 2;

// Remove all occurrences
const newArray = numbers.filter(item => item !== elementToRemove);
console.log(newArray); // [1, 3, 4, 5]
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
function removeElement<T>(array: T[], element: T): T[] {
    return array.filter(item => item !== element);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const result = removeElement(numbers, 3);
console.log(result); // [1, 2, 4, 5]
