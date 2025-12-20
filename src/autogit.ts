function getStringLength(str: string): number {
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}

// Example usage:
console.log(getStringLength("hello")); // Output: 5
