const numbers: number[] = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Creates a new array without the element
const filteredNumbers = numbers.filter(num => num !== elementToRemove);
console.log(filteredNumbers); // [1, 2, 4, 5]
const numbers: number[] = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Find index and remove
const index = numbers.indexOf(elementToRemove);
if (index > -1) {
    numbers.splice(index, 1);
}
console.log(numbers); // [1, 2, 4, 5]
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const userIdToRemove = 2;
const index = users.findIndex(user => user.id === userIdToRemove);

if (index > -1) {
    users.splice(index, 1);
}
console.log(users); // [{ id: 1, name: "Alice" }, { id: 3, name: "Charlie" }]
function removeItem<T>(arr: T[], item: T): T[] {
    return arr.filter(element => element !== item);
}

// For objects with specific property matching
function removeItemByProperty<T, K extends keyof T>(
    arr: T[], 
    property: K, 
    value: T[K]
): T[] {
    return arr.filter(element => element[property] !== value);
}

// Usage
const numbers = removeItem([1, 2, 3, 4, 5], 3);
const filteredUsers = removeItemByProperty(users, 'id', 2);
const numbers: number[] = [1, 2, 3, 2, 4, 2, 5];
const elementToRemove = 2;

// Remove all occurrences
const filteredNumbers = numbers.filter(num => num !== elementToRemove);
console.log(filteredNumbers); // [1, 3, 4, 5]
// With readonly array (immutable)
const readonlyNumbers: readonly number[] = [1, 2, 3, 4, 5];
const filtered = readonlyNumbers.filter(num => num !== 3); // Only way to "remove"
