function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.filter(element => arr2.includes(element));
}

// Usage
const array1: number[] = [1, 2, 3, 4, 5];
const array2: number[] = [4, 5, 6, 7, 8];

const common = findCommonElements(array1, array2);
console.log(common); // [4, 5]
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set(arr2);
    return arr1.filter(element => set.has(element));
}

// Usage
const array1: string[] = ['apple', 'banana', 'cherry', 'date'];
const array2: string[] = ['banana', 'date', 'elderberry', 'fig'];

const common = findCommonElements(array1, array2);
console.log(common); // ['banana', 'date']
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
    const set = new Set<T>(arr2);
    return arr1.filter(item => set.has(item));
}

// Usage with different types
const numbers: number[] = [1, 2, 3, 4];
const numbers2: number[] = [3, 4, 5, 6];
console.log(findCommonElements(numbers, numbers2)); // [3, 4]

const fruits: string[] = ['apple', 'banana', 'orange'];
const fruits2: string[] = ['banana', 'orange', 'grape'];
console.log(findCommonElements(fruits, fruits2)); // ['banana', 'orange']
interface User {
    id: number;
    name: string;
}

function findCommonObjectsByProperty<T, K extends keyof T>(
    arr1: T[], 
    arr2: T[], 
    property: K
): T[] {
    const set = new Set(arr2.map(item => item[property]));
    return arr1.filter(item => set.has(item[property]));
}

// Usage
const users1: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

const users2: User[] = [
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' }
];

const commonUsers = findCommonObjectsByProperty(users1, users2, 'id');
console.log(commonUsers); 
// [
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' }
// ]
// Simple one-liner for primitive types
const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];
const common = array1.filter(x => array2.includes(x)); // [4, 5]

// More efficient one-liner with Set
const commonEfficient = array1.filter(x => new Set(array2).has(x)); // [4, 5]
