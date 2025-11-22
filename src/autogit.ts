const originalArray = [1, 2, 3, 4, 5];
const elementToRemove = 3;

// Returns new array without the element
const newArray = originalArray.filter(item => item !== elementToRemove);
// Result: [1, 2, 4, 5]
const array = [1, 2, 3, 4, 5];
const elementToRemove = 3;

const index = array.indexOf(elementToRemove);
if (index > -1) {
    array.splice(index, 1); // Removes 1 element at the found index
}
// Result: [1, 2, 4, 5]
const array = [1, 2, 3, 4, 5];
const indexToRemove = 2; // Remove third element

array.splice(indexToRemove, 1);
// Result: [1, 2, 4, 5]
// Remove last element
const array = [1, 2, 3];
array.pop(); // Result: [1, 2]

// Remove first element
const array2 = [1, 2, 3];
array2.shift(); // Result: [2, 3]
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
const array = [1, 2, 3, 2, 4, 2, 5];
const elementToRemove = 2;

// Remove all occurrences
const newArray = array.filter(item => item !== elementToRemove);
// Result: [1, 3, 4, 5]
