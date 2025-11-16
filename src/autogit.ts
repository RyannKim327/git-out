function reverseTuple<T extends any[]>(tuple: T): Reverse<T> {
  return [...tuple].reverse() as Reverse<T>;
}

// Usage
const tuple: [string, number, boolean] = ["Hello", 42, true];
const reversed = reverseTuple(tuple); // Type: [boolean, number, string]

console.log(reversed); // Output: [true, 42, "Hello"]
