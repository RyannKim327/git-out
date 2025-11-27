function countChar(str: string, char: string): number {
  let count = 0;
  for (let c of str) {
    if (c === char) {
      count++;
    }
  }
  return count;
}

// Example usage:
const result = countChar("hello world", "l"); // returns 3
function countChar(str: string, char: string): number {
  return str.split(char).length - 1;
}

// Example usage:
const result = countChar("hello world", "l"); // returns 3
function countChar(str: string, char: string): number {
  return Array.from(str).filter(c => c === char).length;
}

// Example usage:
const result = countChar("hello world", "l"); // returns 3
