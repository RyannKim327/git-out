function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

// Example usage
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = removeDuplicates(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

const strings = ["apple", "banana", "apple", "orange"];
const uniqueStrings = removeDuplicates(strings);
console.log(uniqueStrings); // ["apple", "banana", "orange"]
function removeDuplicates<T>(arr: T[]): T[] {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

// Example
const fruits = ["apple", "banana", "apple", "orange"];
const uniqueFruits = removeDuplicates(fruits);
console.log(uniqueFruits); // ["apple", "banana", "orange"]
function removeDuplicates<T>(arr: T[]): T[] {
  return arr.reduce((unique, item) => 
    unique.includes(item) ? unique : [...unique, item], 
    [] as T[]
  );
}

// Example
const colors = ["red", "blue", "red", "green"];
const uniqueColors = removeDuplicates(colors);
console.log(uniqueColors); // ["red", "blue", "green"]
interface User {
  id: number;
  name: string;
}

function removeDuplicateObjects<T>(arr: T[], key: keyof T): T[] {
  const seen = new Set<T[keyof T]>();
  return arr.filter(item => {
    if (seen.has(item[key])) {
      return false;
    }
    seen.add(item[key]);
    return true;
  });
}

// Example
const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice" }, // duplicate ID
  { id: 3, name: "Charlie" }
];

const uniqueUsers = removeDuplicateObjects(users, 'id');
console.log(uniqueUsers); 
// [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
function uniqueArray<T>(arr: T[]): T[] {
  return arr.filter((item, index, self) => 
    index === self.findIndex(i => 
      JSON.stringify(i) === JSON.stringify(item)
    )
  );
}

// Better for objects - using a custom equality function
function uniqueBy<T, K>(arr: T[], getKey: (item: T) => K): T[] {
  const seen = new Set<K>();
  return arr.filter(item => {
    const key = getKey(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// Usage
const items = [
  { id: 1, value: "A" },
  { id: 2, value: "B" },
  { id: 1, value: "A" }
];

const uniqueItems = uniqueBy(items, item => item.id);
console.log(uniqueItems); // Only first item with id: 1
