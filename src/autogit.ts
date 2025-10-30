// For primitive values (strings, numbers, booleans)
const arrayWithDuplicates: string[] = ['apple', 'banana', 'apple', 'orange', 'banana'];
const uniqueArray: string[] = [...new Set(arrayWithDuplicates)];

console.log(uniqueArray); // ['apple', 'banana', 'orange']
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers: number[] = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
const arrayWithDuplicates: string[] = ['apple', 'banana', 'apple', 'orange', 'banana'];

const uniqueArray: string[] = arrayWithDuplicates.filter((item, index) => 
    arrayWithDuplicates.indexOf(item) === index
);

console.log(uniqueArray); // ['apple', 'banana', 'orange']
const arrayWithDuplicates: string[] = ['apple', 'banana', 'apple', 'orange', 'banana'];

const uniqueArray: string[] = arrayWithDuplicates.reduce((unique, item) => 
    unique.includes(item) ? unique : [...unique, item], 
    [] as string[]
);

console.log(uniqueArray); // ['apple', 'banana', 'orange']
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'John' }, // duplicate based on id
    { id: 3, name: 'Bob' }
];

// Remove duplicates based on 'id' property
const uniquePeople: Person[] = people.filter((person, index, self) =>
    index === self.findIndex(p => p.id === person.id)
);

console.log(uniquePeople); // [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}, {id: 3, name: 'Bob'}]
const people: Person[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'John' },
    { id: 3, name: 'Bob' }
];

const uniquePeople: Person[] = Array.from(
    new Map(people.map(item => [item.id, item])).values()
);

console.log(uniquePeople); // [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}, {id: 3, name: 'Bob'}]
function removeDuplicates<T>(array: T[], key?: keyof T): T[] {
    if (!key) {
        // For primitive values or when no key is specified
        return [...new Set(array as any)];
    }
    
    // For objects, remove duplicates based on specified key
    const seen = new Set<T[keyof T]>();
    return array.filter(item => {
        if (seen.has(item[key])) {
            return false;
        }
        seen.add(item[key]);
        return true;
    });
}

// Usage
const fruits: string[] = ['apple', 'banana', 'apple', 'orange'];
console.log(removeDuplicates(fruits)); // ['apple', 'banana', 'orange']

const people: Person[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'John' }
];
console.log(removeDuplicates(people, 'id')); // [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
