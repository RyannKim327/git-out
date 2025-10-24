const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(arrayWithDuplicates)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers: number[] = [...new Set(numbers)];
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.filter((item, index) => 
    arrayWithDuplicates.indexOf(item) === index
);
const arrayWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = arrayWithDuplicates.reduce((accumulator: number[], current) => {
    if (!accumulator.includes(current)) {
        accumulator.push(current);
    }
    return accumulator;
}, []);
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 1, name: "John" }, // duplicate
];

// Remove duplicates based on id property
const uniqueUsers = users.filter((user, index, self) =>
    index === self.findIndex((u) => u.id === user.id)
);

// Alternative using Set with JSON serialization (for simple objects)
const uniqueUsers2 = Array.from(
    new Set(users.map(user => JSON.stringify(user)))
).map(str => JSON.parse(str));
function removeDuplicates<T>(array: T[]): T[] {
    return [...new Set(array)];
}

// Usage
const numbers = removeDuplicates([1, 2, 2, 3, 4, 4, 5]);
const strings = removeDuplicates(["a", "b", "a", "c"]);
function removeDuplicatesFast<T>(array: T[]): T[] {
    const seen = new Map();
    return array.filter(item => {
        const key = item; // or use a unique identifier for objects
        return !seen.has(key) && seen.set(key, true);
    });
}
