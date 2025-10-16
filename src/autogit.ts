// Remove element by value
const array1 = [1, 2, 3, 4, 2, 5];
const valueToRemove = 2;
const newArray = array1.filter(item => item !== valueToRemove);
console.log(newArray); // [1, 3, 4, 5]

// Remove element with type safety
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const personToRemove = 2;
const filteredPeople = people.filter(person => person.id !== personToRemove);
// Remove by index
const array2 = [10, 20, 30, 40, 50];
const indexToRemove = 2;
array2.splice(indexToRemove, 1);
console.log(array2); // [10, 20, 40, 50]

// Remove by value (find index first)
const array3 = ["apple", "banana", "orange", "grape"];
const valueToRemove2 = "orange";
const index = array3.indexOf(valueToRemove2);
if (index > -1) {
    array3.splice(index, 1);
}
console.log(array3); // ["apple", "banana", "grape"]
// Generic function to remove element by value
function removeElement<T>(array: T[], value: T): T[] {
    return array.filter(item => item !== value);
}

// Generic function to remove element by predicate
function removeByPredicate<T>(
    array: T[], 
    predicate: (item: T) => boolean
): T[] {
    return array.filter(item => !predicate(item));
}

// Usage examples
const numbers = [1, 2, 3, 4, 5];
const result1 = removeElement(numbers, 3); // [1, 2, 4, 5]

const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
];
const result2 = removeByPredicate(users, user => user.id === 1);
interface Product {
    id: number;
    name: string;
    price: number;
}

const products: Product[] = [
    { id: 1, name: "Laptop", price: 1000 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 }
];

// Remove product with id = 2
const productsWithoutMouse = products.filter(product => product.id !== 2);
const arrayWithDuplicates = [1, 2, 3, 2, 4, 2, 5];
const valueToRemoveAll = 2;
const cleanArray = arrayWithDuplicates.filter(item => item !== valueToRemoveAll);
console.log(cleanArray); // [1, 3, 4, 5]
