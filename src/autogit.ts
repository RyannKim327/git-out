function countWordOccurrences(text: string, targetWord: string): number {
  const words = text.toLowerCase().split(/\s+/);
  const lowerTarget = targetWord.toLowerCase();
  
  return words.filter(word => word === lowerTarget).length;
}

// Usage
const text = "Hello world hello TypeScript hello";
const count = countWordOccurrences(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesRegex(text: string, targetWord: string): number {
  const regex = new RegExp(`\\b${targetWord}\\b`, 'gi');
  const matches = text.match(regex);
  
  return matches ? matches.length : 0;
}

// Usage
const text = "Hello world hello TypeScript hello";
const count = countWordOccurrencesRegex(text, "hello");
console.log(count); // Output: 3
function countAllWords(text: string): Record<string, number> {
  const words = text.toLowerCase().split(/\s+/);
  
  return words.reduce((acc: Record<string, number>, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
}

// Usage
const text = "Hello world hello TypeScript hello";
const wordCounts = countAllWords(text);
console.log(wordCounts.hello); // Output: 3
console.log(wordCounts); // Output: { hello: 3, world: 1, typescript: 1 }
function countWordOccurrencesCaseSensitive(text: string, targetWord: string): number {
  const regex = new RegExp(`\\b${targetWord}\\b`, 'g');
  const matches = text.match(regex);
  
  return matches ? matches.length : 0;
}

// Usage
const text = "Hello world hello TypeScript Hello";
const count = countWordOccurrencesCaseSensitive(text, "Hello");
console.log(count); // Output: 2
function countWordOccurrences(
  text: string, 
  targetWord: string, 
  options: { caseSensitive?: boolean; wholeWord?: boolean } = {}
): number {
  const { caseSensitive = false, wholeWord = true } = options;
  const flags = caseSensitive ? 'g' : 'gi';
  
  let regexPattern: string;
  
  if (wholeWord) {
    regexPattern = `\\b${targetWord}\\b`;
  } else {
    regexPattern = targetWord;
  }
  
  const regex = new RegExp(regexPattern, flags);
  const matches = text.match(regex);
  
  return matches ? matches.length : 0;
}

// Usage examples
const text = "Hello world hello TypeScript hello. Hellooo!";

console.log(countWordOccurrences(text, "hello")); // 3 (case-insensitive, whole words)
console.log(countWordOccurrences(text, "Hello", { caseSensitive: true })); // 1
console.log(countWordOccurrences(text, "hello", { wholeWord: false })); // 4 (includes "Hellooo")
