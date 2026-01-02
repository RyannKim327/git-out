const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const commonElements = array1.filter(item => array2.includes(item));
console.log(commonElements); // [3, 4, 5]
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

const set2 = new Set(array2);
const commonElements = array1.filter(item => set2.has(item));
console.log(commonElements); // [3, 4, 5]
function findCommonElements<T>(array1: T[], array2: T[]): T[] {
    const set2 = new Set(array2);
    return array1.filter(item => set2.has(item));
}

// Usage
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [3, 4, 5, 6, 7];
const common = findCommonElements(numbers1, numbers2); // [3, 4, 5]

const strings1 = ['apple', 'banana', 'orange'];
const strings2 = ['banana', 'orange', 'grape'];
const commonStrings = findCommonElements(strings1, strings2); // ['banana', 'orange']
function findCommonElementsReduce<T>(array1: T[], array2: T[]): T[] {
    const set2 = new Set(array2);
    return array1.reduce((acc: T[], item) => {
        if (set2.has(item)) {
            acc.push(item);
        }
        return acc;
    }, []);
}
interface User {
    id: number;
    name: string;
}

const users1: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const users2: User[] = [
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'David' }
];

// Compare by id
const commonUsers = users1.filter(user1 => 
    users2.some(user2 => user2.id === user1.id)
);
console.log(commonUsers); // [{id: 2, name: 'Bob'}, {id: 3, name: 'Charlie'}]

// Or using Set with custom property
const userIds2 = new Set(users2.map(user => user.id));
const commonUsersBetter = users1.filter(user => userIds2.has(user.id));
// Ensure type safety by explicitly typing your arrays
const array1: number[] = [1, 2, 3];
const array2: number[] = [2, 3, 4];

// Or use type inference
const array3 = [1, 2, 3] as const; // Readonly tuple type
