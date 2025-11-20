const array = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Remove all occurrences
const newArray = array.filter(item => item !== elementToRemove);

// Remove first occurrence only
const index = array.indexOf(elementToRemove);
const newArray = index > -1 ? [...array.slice(0, index), ...array.slice(index + 1)] : array;
const array = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Find index and remove
const index = array.indexOf(elementToRemove);
if (index > -1) {
    array.splice(index, 1); // Removes 1 element at the found index
}
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Doe" }
];

// Remove user with id 2
const userIdToRemove = 2;
const filteredUsers = users.filter(user => user.id !== userIdToRemove);
function removeElement<T>(array: T[], element: T): T[] {
    return array.filter(item => item !== element);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const result = removeElement(numbers, 3); // [1, 2, 4, 5]
const array = [1, 2, 3, 2, 4, 2, 5];
const elementToRemove = 2;

// Remove all occurrences
const newArray = array.filter(item => item !== elementToRemove);
// Result: [1, 3, 4, 5]
function removeItem<T>(arr: T[], item: T): T[] {
    return arr.filter(i => i !== item);
}

// Usage with type inference
const numbers = [1, 2, 3, 4, 5];
const strings = ["a", "b", "c"];

const filteredNumbers = removeItem(numbers, 3);
const filteredStrings = removeItem(strings, "b");
