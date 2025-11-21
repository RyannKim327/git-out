function countChar(str: string, char: string): number {
  return str.split(char).length - 1;
}

// Example usage:
console.log(countChar("hello world", "l")); // Output: 3
function countChar(str: string, char: string): number {
  const regex = new RegExp(escapeRegExp(char), 'g');
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

// Helper function to escape regex special characters
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Example usage:
console.log(countChar("hello.world", ".")); // Output: 1 (correctly handles special chars)
