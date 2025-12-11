// Remove all occurrences of a specific value
const numbers: number[] = [1, 2, 3, 4, 2, 5];
const valueToRemove = 2;
const filteredNumbers = numbers.filter(item => item !== valueToRemove);
// Result: [1, 3, 4, 5]

// Remove first occurrence only
const numbers2: number[] = [1, 2, 3, 4, 2, 5];
const index = numbers2.indexOf(2);
if (index > -1) {
    const filteredNumbers2 = numbers2.filter((_, i) => i !== index);
    // Result: [1, 3, 4, 2, 5]
}
const fruits: string[] = ['apple', 'banana', 'orange', 'mango'];
const index = fruits.indexOf('banana');

if (index > -1) {
    fruits.splice(index, 1); // Remove 1 element at the found index
}
// fruits is now: ['apple', 'orange', 'mango']
const items: string[] = ['a', 'b', 'c', 'd'];
const indexToRemove = 2;
const newItems = [...items.slice(0, indexToRemove), ...items.slice(indexToRemove + 1)];
// Result: ['a', 'b', 'd']
function removeItem<T>(array: T[], item: T): T[] {
    return array.filter(element => element !== item);
}

function removeItemAtIndex<T>(array: T[], index: number): T[] {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

// Usage
const numbers: number[] = [1, 2, 3, 4, 5];
const result = removeItem(numbers, 3); // [1, 2, 4, 5]
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const userIdToRemove = 2;
const filteredUsers = users.filter(user => user.id !== userIdToRemove);
// Result: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]
