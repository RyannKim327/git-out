function fisherYatesShuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        
        // Swap it with the current element
        [shuffled[currentIndex], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[currentIndex]
        ];
    }
    
    return shuffled;
}

// Example usage
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffledNumbers = fisherYatesShuffle(numbers);

console.log('Original:', numbers);
console.log('Shuffled:', shuffledNumbers);

// Example with strings
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const shuffledFruits = fisherYatesShuffle(fruits);

console.log('Original fruits:', fruits);
console.log('Shuffled fruits:', shuffledFruits);

// Example with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

const shuffledPeople = fisherYatesShuffle(people);
console.log('Shuffled people:', shuffledPeople);
function quickSort<T>(array: T[]): T[] {
    if (array.length <= 1) {
        return array;
    }
    
    const pivot = array[0];
    const left: T[] = [];
    const right: T[] = [];
    
    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Example usage
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6, 5];
const sorted = quickSort(unsorted);
console.log('Sorted:', sorted);
