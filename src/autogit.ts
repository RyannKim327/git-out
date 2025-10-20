function countOccurrences(text: string, char: string): number {
  return text.split(char).length - 1;
}

// Examples
const text = "Hello, World!";
console.log(countOccurrences(text, 'l')); // Output: 3
console.log(countOccurrences(text, 'o')); // Output: 2
console.log(countOccurrences(text, 'x')); // Output: 0
function countOccurrencesRegex(text: string, char: string): number {
  const matches = text.match(new RegExp(escapeRegex(char), 'g'));
  return matches ? matches.length : 0;
}

// Helper function to escape special regex characters
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Examples
const text = "Hello, World!";
console.log(countOccurrencesRegex(text, 'l')); // Output: 3
function countOccurrencesLoop(text: string, char: string): number {
  let count = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === char) {
      count++;
    }
  }
  return count;
}

// Examples
const text = "Hello, World!";
console.log(countOccurrencesLoop(text, 'l')); // Output: 3
function countOccurrencesFilter(text: string, char: string): number {
  return Array.from(text).filter(c => c === char).length;
}

// Examples
const text = "Hello, World!";
console.log(countOccurrencesFilter(text, 'l')); // Output: 3
function countOccurrencesCaseInsensitive(text: string, char: string): number {
  return text.toLowerCase().split(char.toLowerCase()).length - 1;
}

// Example
const text = "Hello, World!";
console.log(countOccurrencesCaseInsensitive(text, 'L')); // Output: 3
function countCharacterOccurrences(
  text: string, 
  character: string
): number {
  // Input validation
  if (character.length !== 1) {
    throw new Error('Character parameter must be a single character');
  }
  
  if (text.length === 0) {
    return 0;
  }
  
  return text.split(character).length - 1;
}

// Usage examples
const exampleText = "TypeScript is awesome!";

console.log(countCharacterOccurrences(exampleText, 's')); // 2
console.log(countCharacterOccurrences(exampleText, '!')); // 1
console.log(countCharacterOccurrences(exampleText, 'x')); // 0
