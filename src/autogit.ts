function findCommonElementsSet<T>(arr1: T[], arr2: T[]): T[] {
    const set2 = new Set(arr2);
    const commonElements = new Set<T>(); // Use another Set to ensure unique common elements

    for (const item of arr1) {
        if (set2.has(item)) {
            commonElements.add(item);
        }
    }

    return Array.from(commonElements);
}

// --- Examples ---

// 1. Primitive types (numbers)
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const commonNumbers = findCommonElementsSet(array1, array2);
console.log("Common Numbers:", commonNumbers); // Output: Common Numbers: [3, 4, 5]

// 2. Primitive types (strings)
const fruits1 = ["apple", "banana", "orange", "grape"];
const fruits2 = ["banana", "kiwi", "orange", "pineapple"];
const commonFruits = findCommonElementsSet(fruits1, fruits2);
console.log("Common Fruits:", commonFruits); // Output: Common Fruits: ["banana", "orange"]

// 3. With duplicates in input arrays (result will be unique)
const arrA = [1, 2, 2, 3, 4];
const arrB = [2, 3, 3, 5, 6];
const commonUnique = findCommonElementsSet(arrA, arrB);
console.log("Common Unique (from duplicates):", commonUnique); // Output: Common Unique (from duplicates): [2, 3]
function findCommonElementsFilter<T>(arr1: T[], arr2: T[]): T[] {
    // To ensure unique common elements, filter a Set created from arr1
    const uniqueArr1 = Array.from(new Set(arr1));
    return uniqueArr1.filter(item => arr2.includes(item));
}

// --- Examples ---

const array3 = [1, 2, 3, 4, 5];
const array4 = [3, 4, 5, 6, 7];
const commonNumbersFilter = findCommonElementsFilter(array3, array4);
console.log("Common Numbers (Filter):", commonNumbersFilter); // Output: Common Numbers (Filter): [3, 4, 5]

const arrC = [1, 2, 2, 3, 4];
const arrD = [2, 3, 3, 5, 6];
const commonUniqueFilter = findCommonElementsFilter(arrC, arrD);
console.log("Common Unique (Filter from duplicates):", commonUniqueFilter); // Output: Common Unique (Filter from duplicates): [2, 3]
const obj1 = { id: 1, name: "Alice" };
const obj2 = { id: 1, name: "Alice" };
console.log(obj1 === obj2); // Output: false (different references)
interface MyObject {
    id: number;
    name: string;
    // Add other properties as needed
}

function findCommonObjectsByKey(arr1: MyObject[], arr2: MyObject[], key: keyof MyObject): MyObject[] {
    const map2 = new Map<any, MyObject>(); // Map key value to the actual object

    // Populate map2 for faster lookups
    for (const obj of arr2) {
        map2.set(obj[key], obj);
    }

    const commonObjects: MyObject[] = [];
    const foundKeys = new Set<any>(); // To ensure unique common objects in the result

    for (const obj1 of arr1) {
        const keyValue = obj1[key];
        if (map2.has(keyValue) && !foundKeys.has(keyValue)) {
            // We can add either obj1 or map2.get(keyValue), depending on preference
            // Adding obj1 keeps the original reference from arr1
            commonObjects.push(obj1);
            foundKeys.add(keyValue); // Mark this key as found to avoid duplicates
        }
    }

    return commonObjects;
}

// --- Example ---
const users1: MyObject[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 2, name: "Bobby" } // Different name, same ID as Bob
];

const users2: MyObject[] = [
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" },
    { id: 1, name: "Alicia" } // Different name, same ID as Alice
];

const commonUsersById = findCommonObjectsByKey(users1, users2, "id");
console.log("Common Users by ID:", commonUsersById);
// Output: Common Users by ID: [ { id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' } ]
// Note: Only Alice and Charlie are found. Bob (id:2) is not in users2.
// Alicia (id:1 from users2) is matched with Alice (id:1 from users1).
