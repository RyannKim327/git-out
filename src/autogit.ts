function getStringLength(str: string): number {
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}

// Example usage:
const myString = "Hello, world!";
console.log(getStringLength(myString)); // Output: 13
