const numbers: number[] = [5, 2, 9, 1, 7];
const maxValue: number = Math.max(...numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [5, 2, 9, 1, 7];
const maxValue: number = Math.max.apply(null, numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [5, 2, 9, 1, 7];
const maxValue: number = numbers.reduce((max, current) => 
    Math.max(max, current), -Infinity
);
console.log(maxValue); // Output: 9
function findMax<T extends number>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr.reduce((max, current) => 
        current > max ? current : max, arr[0]
    );
}

const numbers: number[] = [5, 2, 9, 1, 7];
const maxValue = findMax(numbers);
console.log(maxValue); // Output: 9
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 }
];

const oldestPerson = people.reduce((max, person) => 
    person.age > max.age ? person : max, people[0]
);

console.log(oldestPerson); // Output: { name: "Bob", age: 30 }
function safeMax(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const emptyArray: number[] = [];
const numbers: number[] = [5, 2, 9, 1, 7];

console.log(safeMax(emptyArray)); // Output: null
console.log(safeMax(numbers));    // Output: 9
// For extremely large arrays
function findMaxLargeArray(arr: number[]): number {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
