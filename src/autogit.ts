function countCharOccurrences(str: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('Input must be a single character.');
  }
  let count = 0;
  for (const c of str) {
    if (c === char) count++;
  }
  return count;
}

// Example usage
console.log(countCharOccurrences("hello", "l")); // Output: 2
function countCharOccurrences(str: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('Input must be a single character.');
  }
  return str.split(char).length - 1;
}

// Example usage
console.log(countCharOccurrences("apple", "p")); // Output: 2
function countCharOccurrences(str: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('Input must be a single character.');
  }
  const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex special chars
  const regex = new RegExp(escapedChar, 'g'); // Global regex
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

// Example usage
console.log(countCharOccurrences("banana", "a")); // Output: 3
