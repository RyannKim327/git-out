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
const numbers1 = [1, 2, 3, 4];
const numbers2 = [3, 4, 5, 6];
console.log(findCommonElements(numbers1, numbers2)); // [3, 4]

const strings1 = ['apple', 'banana', 'orange'];
const strings2 = ['banana', 'grape', 'orange'];
console.log(findCommonElements(strings1, strings2)); // ['banana', 'orange']
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

// Find common users by id
const commonUsers = users1.filter(user1 => 
    users2.some(user2 => user2.id === user1.id)
);
console.log(commonUsers); // [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
function findCommonElementsReduce<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    return arr1.reduce((common, item) => {
        if (set2.has(item)) {
            common.push(item);
        }
        return common;
    }, [] as T[]);
}

const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
console.log(findCommonElementsReduce(arr1, arr2)); // [3, 4]
