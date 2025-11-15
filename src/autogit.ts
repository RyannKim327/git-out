function countCharacter(text: string, char: string): number {
  // ... implementation
}
function countCharacterForOf(text: string, char: string): number {
  if (char.length !== 1) {
    throw new Error("The 'char' argument must be a single character.");
  }

  let count = 0;
  for (const c of text) { // 'c' will be a string of length 1
    if (c === char) {
      count++;
    }
  }
  return count;
}

// Example Usage:
console.log("Method 1 (For...of):");
console.log(`'hello world'.count('o') -> ${countCharacterForOf('hello world', 'o')}`); // Output: 2
console.log(`'banana'.count('a') -> ${countCharacterForOf('banana', 'a')}`);       // Output: 3
console.log(`'typescript'.count('x') -> ${countCharacterForOf('typescript', 'x')}`); // Output: 0
// console.log(countCharacterForOf('test', 'abc')); // Throws error
function countCharacterSplit(text: string, char: string): number {
  if (char.length !== 1) {
    throw new Error("The 'char' argument must be a single character.");
  }

  // If the char is not found, split returns an array with one element (the original string).
  // If the char is found N times, split returns an array with N+1 elements.
  return text.split(char).length - 1;
}

// Example Usage:
console.log("\nMethod 2 (Split):");
console.log(`'hello world'.count('o') -> ${countCharacterSplit('hello world', 'o')}`); // Output: 2
console.log(`'banana'.count('a') -> ${countCharacterSplit('banana', 'a')}`);       // Output: 3
console.log(`'typescript'.count('x') -> ${countCharacterSplit('typescript', 'x')}`); // Output: 0
function countCharacterFilter(text: string, char: string): number {
  if (char.length !== 1) {
    throw new Error("The 'char' argument must be a single character.");
  }

  return [...text].filter(c => c === char).length;
}

// Example Usage:
console.log("\nMethod 3 (Filter):");
console.log(`'hello world'.count('o') -> ${countCharacterFilter('hello world', 'o')}`); // Output: 2
console.log(`'banana'.count('a') -> ${countCharacterFilter('banana', 'a')}`);       // Output: 3
console.log(`'typescript'.count('x') -> ${countCharacterFilter('typescript', 'x')}`); // Output: 0
function countCharacterReduce(text: string, char: string): number {
  if (char.length !== 1) {
    throw new Error("The 'char' argument must be a single character.");
  }

  return [...text].reduce((count, c) => (c === char ? count + 1 : count), 0);
}

// Example Usage:
console.log("\nMethod 4 (Reduce):");
console.log(`'hello world'.count('o') -> ${countCharacterReduce('hello world', 'o')}`); // Output: 2
console.log(`'banana'.count('a') -> ${countCharacterReduce('banana', 'a')}`);       // Output: 3
console.log(`'typescript'.count('x') -> ${countCharacterReduce('typescript', 'x')}`); // Output: 0
function countCharacterRegEx(text: string, char: string): number {
  if (char.length !== 1) {
    throw new Error("The 'char' argument must be a single character.");
  }

  // Escape special regex characters in 'char' to prevent errors or unintended behavior
  // For example, if char is '.', it matches any character. We want to match literal '.'.
  const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedChar, 'g');
  const matches = text.match(regex);

  // If no matches are found, match() returns null, so we need to handle that.
  return matches ? matches.length : 0;
}

// Example Usage:
console.log("\nMethod 5 (RegEx):");
console.log(`'hello world'.count('o') -> ${countCharacterRegEx('hello world', 'o')}`); // Output: 2
console.log(`'banana'.count('a') -> ${countCharacterRegEx('banana', 'a')}`);       // Output: 3
console.log(`'typescript'.count('x') -> ${countCharacterRegEx('typescript', 'x')}`); // Output: 0
console.log(`'1.2.3'.count('.') -> ${countCharacterRegEx('1.2.3', '.')}`);           // Output: 2 (escaped correctly)
