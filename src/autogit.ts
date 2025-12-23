function countCharacter(text: string, char: string): number {
  return text.split(char).length - 1;
}

// Usage
const result = countCharacter("hello world", "l");
console.log(result); // Output: 3
function countCharacterRegex(text: string, char: string): number {
  const regex = new RegExp(char, "g");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// Usage
const result = countCharacterRegex("hello world", "l");
console.log(result); // Output: 3
function countCharacterLoop(text: string, char: string): number {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === char) count++;
  }
  return count;
}

// Usage
const result = countCharacterLoop("hello world", "l");
console.log(result); // Output: 3
function countCharacterReduce(text: string, char: string): number {
  return [...text].reduce((count, currentChar) => 
    currentChar === char ? count + 1 : count, 0);
}

// Usage
const result = countCharacterReduce("hello world", "l");
console.log(result); // Output: 3
function countCharacterCaseInsensitive(text: string, char: string): number {
  const lowerText = text.toLowerCase();
  const lowerChar = char.toLowerCase();
  return lowerText.split(lowerChar).length - 1;
}

// Usage
const result = countCharacterCaseInsensitive("Hello World", "h");
console.log(result); // Output: 1 (includes both 'H' and 'h')
function countCharacter(
  text: string, 
  char: string, 
  caseSensitive: boolean = true
): number {
  if (char.length !== 1) {
    throw new Error("Character parameter must be a single character");
  }
  
  const searchText = caseSensitive ? text : text.toLowerCase();
  const searchChar = caseSensitive ? char : char.toLowerCase();
  
  return searchText.split(searchChar).length - 1;
}

// Usage examples
console.log(countCharacter("Hello World", "l")); // 3
console.log(countCharacter("Hello World", "h", false)); // 1 (case-insensitive)
