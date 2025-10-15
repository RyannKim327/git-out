const array1: number[] = [1, 2, 3, 4, 5];
const array2: number[] = [3, 4, 5, 6, 7];

const commonElements = array1.filter(item => array2.includes(item));
console.log(commonElements); // [3, 4, 5]
const array1: number[] = [1, 2, 3, 4, 5];
const array2: number[] = [3, 4, 5, 6, 7];

const set2 = new Set(array2);
const commonElements = array1.filter(item => set2.has(item));
console.log(commonElements); // [3, 4, 5]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    return arr1.filter(item => set2.has(item));
}

// Usage
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
console.log(findCommonElements(numbers1, numbers2)); // [3, 4, 5]

const strings1 = ["apple", "banana", "cherry"];
const strings2 = ["banana", "date", "cherry"];
console.log(findCommonElements(strings1, strings2)); // ["banana", "cherry"]
interface User {
    id: number;
    name: string;
}

const users1: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const users2: User[] = [
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" }
];

// Compare by id
const commonUsers = users1.filter(user1 => 
    users2.some(user2 => user2.id === user1.id)
);
console.log(commonUsers); // [{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
const array1: number[] = [1, 2, 3, 4, 5];
const array2: number[] = [3, 4, 5, 6, 7];

const commonElements = array1.reduce((acc, current) => {
    if (array2.includes(current)) {
        acc.push(current);
    }
    return acc;
}, [] as number[]);

console.log(commonElements); // [3, 4, 5]
// Best practice for most scenarios
function getCommonElements<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set(arr2);
    return arr1.filter(item => set.has(item));
}
