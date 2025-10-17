// Basic example
const arrayWithDuplicates: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray: number[] = [...new Set(arrayWithDuplicates)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]

// For strings
const fruits: string[] = ['apple', 'banana', 'apple', 'orange', 'banana'];
const uniqueFruits: string[] = [...new Set(fruits)];
console.log(uniqueFruits); // ['apple', 'banana', 'orange']

// For objects (compares by reference, not by value)
const objects = [{ id: 1 }, { id: 2 }, { id: 1 }];
const uniqueObjects = [...new Set(objects)]; // Only removes identical references
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers: number[] = numbers.filter((item, index) => 
    numbers.indexOf(item) === index
);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
const numbers: number[] = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers: number[] = numbers.reduce((unique, item) => 
    unique.includes(item) ? unique : [...unique, item], 
    [] as number[]
);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'Johnny' },
    { id: 3, name: 'Bob' }
];

// Remove duplicates by 'id'
const uniquePeopleById: Person[] = people.filter(
    (person, index, self) => 
        index === self.findIndex(p => p.id === person.id)
);
console.log(uniquePeopleById); 
// [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }]
const people: Person[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'Johnny' },
    { id: 3, name: 'Bob' }
];

const uniquePeopleMap = new Map<number, Person>();
people.forEach(person => {
    uniquePeopleMap.set(person.id, person);
});

const uniquePeople: Person[] = Array.from(uniquePeopleMap.values());
console.log(uniquePeople); 
// [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 3, name: 'Bob' }]
