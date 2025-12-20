const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]
const arrayWithDuplicates: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray: number[] = [...new Set(arrayWithDuplicates)];
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.filter((item, index) => 
    arrayWithDuplicates.indexOf(item) === index
);
console.log(uniqueArray); // [1, 2, 3, 4, 5]
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
    }
    return accumulator;
}, [] as number[]);
console.log(uniqueArray); // [1, 2, 3, 4, 5]
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 1, name: "John" }, // duplicate
    { id: 3, name: "Bob" }
];

// Remove duplicates based on id property
const uniqueUsers = users.filter((user, index, self) =>
    index === self.findIndex((u) => u.id === user.id)
);

console.log(uniqueUsers);
// [{ id: 1, name: "John" }, { id: 2, name: "Jane" }, { id: 3, name: "Bob" }]
function removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
}

// Usage
const numbers = removeDuplicates([1, 2, 2, 3, 4]);
const strings = removeDuplicates(["a", "b", "a", "c"]);
