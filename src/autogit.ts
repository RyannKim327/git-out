function removeDuplicatesPrimitives<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

// --- Examples ---
const numbers = [1, 2, 2, 3, 4, 4, 5, 1];
const uniqueNumbers = removeDuplicatesPrimitives(numbers);
console.log("Unique Numbers:", uniqueNumbers); // Output: Unique Numbers: [1, 2, 3, 4, 5]

const strings = ["apple", "banana", "orange", "apple", "grape", "banana"];
const uniqueStrings = removeDuplicatesPrimitives(strings);
console.log("Unique Strings:", uniqueStrings); // Output: Unique Strings: ["apple", "banana", "orange", "grape"]

const booleans = [true, false, true, false];
const uniqueBooleans = removeDuplicatesPrimitives(booleans);
console.log("Unique Booleans:", uniqueBooleans); // Output: Unique Booleans: [true, false]
interface MyObject {
  id: number;
  name: string;
}

const obj1 = { id: 1, name: "Alice" };
const obj2 = { id: 2, name: "Bob" };
const obj3 = { id: 1, name: "Alice" }; // Same content as obj1, but a different object instance
const obj4 = obj1; // Same object instance as obj1

const objectArray = [obj1, obj2, obj3, obj4];

// Using Set directly:
const uniqueObjectsByReference = [...new Set(objectArray)];
console.log("Unique Objects (by reference):", uniqueObjectsByReference);
/* Output:
[
  { id: 1, name: 'Alice' }, // obj1
  { id: 2, name: 'Bob' },   // obj2
  { id: 1, name: 'Alice' }  // obj3 (different instance than obj1)
]
*/
// Notice obj3 is still present because it's a different object instance than obj1,
// even though its content is identical. obj4 (which is obj1) *was* removed.
interface MyObject {
  id: number;
  name: string;
  category?: string;
}

function removeDuplicatesByProperty<T>(arr: T[], keyExtractor: (item: T) => string | number): T[] {
  const seen = new Set<string | number>();
  return arr.filter(item => {
    const key = keyExtractor(item);
    if (!seen.has(key)) {
      seen.add(key);
      return true; // Keep this item
    }
    return false; // Discard this item (it's a duplicate)
  });
}

// --- Examples ---
const people: MyObject[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice" }, // Duplicate by 'id'
  { id: 3, name: "Charlie" },
  { id: 2, name: "Robert" }, // Duplicate by 'id' (name is different)
  { id: 4, name: "Alice" }, // Duplicate by 'name' (id is different)
];

// 1. Remove duplicates based on 'id'
const uniqueById = removeDuplicatesByProperty(people, (person) => person.id);
console.log("Unique by ID:", uniqueById);
/* Output:
Unique by ID: [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Alice' }
]
*/

// 2. Remove duplicates based on 'name'
const uniqueByName = removeDuplicatesByProperty(people, (person) => person.name);
console.log("Unique by Name:", uniqueByName);
/* Output:
Unique by Name: [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 2, name: 'Robert' } // 'Robert' is unique by name
]
*/

// 3. Remove duplicates based on a combination of properties (e.g., id and name)
const products: MyObject[] = [
    { id: 101, name: "Laptop", category: "Electronics" },
    { id: 102, name: "Mouse", category: "Electronics" },
    { id: 101, name: "Laptop", category: "Electronics" }, // Exact duplicate
    { id: 103, name: "Keyboard", category: "Electronics" },
    { id: 101, name: "Laptop Pro", category: "Electronics" }, // Different name, same ID
];

const uniqueProducts = removeDuplicatesByProperty(products, (product) => `${product.id}-${product.name}`);
console.log("Unique Products (by ID & Name):", uniqueProducts);
/* Output:
Unique Products (by ID & Name): [
  { id: 101, name: 'Laptop', category: 'Electronics' },
  { id: 102, name: 'Mouse', category: 'Electronics' },
  { id: 103, name: 'Keyboard', category: 'Electronics' },
  { id: 101, name: 'Laptop Pro', category: 'Electronics' }
]
*/
function removeDuplicatesReduce<T>(arr: T[], keyExtractor: (item: T) => string | number): T[] {
  const seen = new Set<string | number>();
  return arr.reduce((accumulator: T[], currentItem: T) => {
    const key = keyExtractor(currentItem);
    if (!seen.has(key)) {
      seen.add(key);
      accumulator.push(currentItem);
    }
    return accumulator;
  }, []); // Initial value of accumulator is an empty array
}

// Example using the same 'people' array as before:
const uniquePeopleReduce = removeDuplicatesReduce(people, (person) => person.id);
console.log("Unique People (by ID using reduce):", uniquePeopleReduce);
/* Output:
Unique People (by ID using reduce): [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Alice' }
]
*/
