// Remove by value
const numbers = [1, 2, 3, 4, 5];
const filteredNumbers = numbers.filter(num => num !== 3);
console.log(filteredNumbers); // [1, 2, 4, 5]

// Remove by index
const removeByIndex = (arr: any[], index: number) => 
    arr.filter((_, i) => i !== index);

const result = removeByIndex(numbers, 2);
console.log(result); // [1, 2, 4, 5]
const numbers = [1, 2, 3, 4, 5];

// Remove by index
numbers.splice(2, 1); // Remove 1 element at index 2
console.log(numbers); // [1, 2, 4, 5]

// Remove by value (find index first)
const valueToRemove = 3;
const index = numbers.indexOf(valueToRemove);
if (index > -1) {
    numbers.splice(index, 1);
}
const numbers = [1, 2, 3, 4, 5];

// Remove by index
const indexToRemove = 2;
const newArray = [
    ...numbers.slice(0, indexToRemove),
    ...numbers.slice(indexToRemove + 1)
];
console.log(newArray); // [1, 2, 4, 5]
// Remove first occurrence of value
function removeValue<T>(arr: T[], value: T): T[] {
    const index = arr.indexOf(value);
    if (index > -1) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
    return arr;
}

// Remove all occurrences of value
function removeAllValues<T>(arr: T[], value: T): T[] {
    return arr.filter(item => item !== value);
}

// Remove by predicate
function removeByPredicate<T>(arr: T[], predicate: (item: T) => boolean): T[] {
    return arr.filter(item => !predicate(item));
}

// Example usage
const fruits = ['apple', 'banana', 'orange', 'apple'];
console.log(removeValue(fruits, 'apple')); // ['banana', 'orange', 'apple']
console.log(removeAllValues(fruits, 'apple')); // ['banana', 'orange']
console.log(removeByPredicate(fruits, fruit => fruit.startsWith('a'))); // ['banana', 'orange']
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// Remove user by ID
const usersWithoutBob = users.filter(user => user.id !== 2);
console.log(usersWithoutBob); // Alice and Charlie remain
