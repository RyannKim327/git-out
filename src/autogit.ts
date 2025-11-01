function findCommonPrimitives<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2); // Convert the second array to a Set for O(1) average lookup
    return arr1.filter(item => set2.has(item)); // Filter the first array based on Set presence
}

// --- Examples ---
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [4, 5, 6, 7, 8];
console.log('Common Numbers:', findCommonPrimitives(numbers1, numbers2)); // Output: [4, 5]

const strings1 = ["apple", "banana", "orange", "grape"];
const strings2 = ["banana", "kiwi", "grape", "melon"];
console.log('Common Strings:', findCommonPrimitives(strings1, strings2)); // Output: ["banana", "grape"]

// With duplicates in arr1:
const numbers3 = [1, 2, 2, 3, 4];
const numbers4 = [2, 4];
console.log('Common Numbers (with duplicates):', findCommonPrimitives(numbers3, numbers4)); // Output: [2, 2, 4]
// If you want unique common elements, you can wrap the result in new Set()
console.log('Unique Common Numbers:', Array.from(new Set(findCommonPrimitives(numbers3, numbers4)))); // Output: [2, 4]
interface User {
    id: number;
    name: string;
    email: string;
}

function findCommonObjectsById<T extends { id: any }>(arr1: T[], arr2: T[]): T[] {
    // Extract the IDs from the second array into a Set for efficient lookups
    const idsInArr2 = new Set(arr2.map(obj => obj.id));

    // Filter the first array, checking if each object's ID exists in the set of IDs from arr2
    return arr1.filter(obj => idsInArr2.has(obj.id));
}

// --- Examples ---
const usersA: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
];

const usersB: User[] = [
    { id: 2, name: "Bobby", email: "bobby@example.com" }, // Same ID, different name/email
    { id: 3, name: "Charlie", email: "charlie@example.com" }, // Same ID, same name/email
    { id: 4, name: "David", email: "david@example.com" }
];

console.log('Common Users by ID:', findCommonObjectsById(usersA, usersB));
/*
Output:
[
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" }
]
*/

// What if the ID property isn't named 'id'? You can use a generic key selector.
function findCommonObjectsByKey<T>(
    arr1: T[],
    arr2: T[],
    keySelector: (item: T) => any // Function to extract the unique key from an object
): T[] {
    const keysInArr2 = new Set(arr2.map(keySelector));
    return arr1.filter(item => keysInArr2.has(keySelector(item)));
}

// --- Examples ---
interface Product {
    sku: string;
    name: string;
    price: number;
}

const productsA: Product[] = [
    { sku: "P001", name: "Laptop", price: 1200 },
    { sku: "P002", name: "Mouse", price: 25 },
    { sku: "P003", name: "Keyboard", price: 75 },
];

const productsB: Product[] = [
    { sku: "P002", name: "Gaming Mouse", price: 50 }, // Same SKU, different name/price
    { sku: "P003", name: "Mechanical Keyboard", price: 100 }, // Same SKU, different name/price
    { sku: "P004", name: "Monitor", price: 300 },
];

// Find common products based on 'sku'
console.log('Common Products by SKU:', findCommonObjectsByKey(productsA, productsB, p => p.sku));
/*
Output:
[
  { sku: "P002", name: "Mouse", price: 25 },
  { sku: "P003", name: "Keyboard", price: 75 }
]
*/

// Find common products based on 'name' (assuming names are unique enough)
interface Item {
    id: number;
    title: string;
    category: string;
}

const itemsA: Item[] = [
    { id: 1, title: "Book A", category: "Fiction" },
    { id: 2, title: "Book B", category: "Science" },
    { id: 3, title: "Book C", category: "History" },
];

const itemsB: Item[] = [
    { id: 4, title: "Book B", category: "Fantasy" }, // Different ID, but same title
    { id: 5, title: "Book D", category: "Science" },
];

console.log('Common Items by Title:', findCommonObjectsByKey(itemsA, itemsB, item => item.title));
/*
Output:
[ { id: 2, title: "Book B", category: "Science" } ]
*/
function getUniqueCommonElements<T>(commonElements: T[]): T[] {
    return Array.from(new Set(commonElements));
}

// Example with primitive type:
const numbersDup1 = [1, 2, 2, 3, 4];
const numbersDup2 = [2, 4, 5];
const commonPrimitiveResult = findCommonPrimitives(numbersDup1, numbersDup2);
console.log('Common primitives (with duplicates):', commonPrimitiveResult); // [2, 2, 4]
console.log('Unique common primitives:', getUniqueCommonElements(commonPrimitiveResult)); // [2, 4]

// Example with objects using a key selector for uniqueness:
function getUniqueCommonObjects<T>(commonObjects: T[], keySelector: (item: T) => any): T[] {
    const seenKeys = new Set();
    const uniqueResult: T[] = [];
    for (const obj of commonObjects) {
        const key = keySelector(obj);
        if (!seenKeys.has(key)) {
            seenKeys.add(key);
            uniqueResult.push(obj);
        }
    }
    return uniqueResult;
}

const usersC: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" } // Duplicate object in source array
];

const usersD: User[] = [
    { id: 2, name: "Bobby", email: "bobby@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
];

const commonUsers = findCommonObjectsById(usersC, usersD);
console.log('Common users (with potential source duplicates):', commonUsers);
// Output: [ { id: 2, name: 'Bob', email: 'bob@example.com' }, { id: 2, name: 'Bob', email: 'bob@example.com' } ]

console.log('Unique common users by ID:', getUniqueCommonObjects(commonUsers, user => user.id));
// Output: [ { id: 2, name: 'Bob', email: 'bob@example.com' } ]
