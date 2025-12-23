function countCharacter(text: string, char: string): number {
  return text.split(char).length - 1;
}

// Usage
const text = "hello world";
const count = countCharacter(text, "l");
console.log(count); // Output: 3
function countCharacterRegex(text: string, char: string): number {
  const regex = new RegExp(char, "g");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// Usage
const text = "hello world";
const count = countCharacterRegex(text, "l");
console.log(count); // Output: 3
function countCharacterLoop(text: string, char: string): number {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === char) {
      count++;
    }
  }
  return count;
}

// Usage
const text = "hello world";
const count = countCharacterLoop(text, "l");
console.log(count); // Output: 3
function countCharacterReduce(text: string, char: string): number {
  return [...text].reduce((count, currentChar) => {
    return currentChar === char ? count + 1 : count;
  }, 0);
}

// Usage
const text = "hello world";
const count = countCharacterReduce(text, "l");
console.log(count); // Output: 3
function countCharacterCaseInsensitive(text: string, char: string): number {
  const lowerText = text.toLowerCase();
  const lowerChar = char.toLowerCase();
  return lowerText.split(lowerChar).length - 1;
}

// Usage
const text = "Hello World";
const count = countCharacterCaseInsensitive(text, "h");
console.log(count); // Output: 1
function countOccurrences(text: string, searchChar: string): number {
  if (searchChar.length !== 1) {
    throw new Error("Search character must be a single character");
  }
  
  return text.split(searchChar).length - 1;
}

// Usage examples
const exampleText = "TypeScript is awesome!";

console.log(countOccurrences(exampleText, "e")); // Output: 3
console.log(countOccurrences(exampleText, "s")); // Output: 2
console.log(countOccurrences(exampleText, "z")); // Output: 0
