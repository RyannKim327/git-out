function countWordOccurrences(text: string, word: string): number {
  const words = text.toLowerCase().split(/\s+/);
  return words.filter(w => w === word.toLowerCase()).length;
}

// Usage
const text = "Hello world hello typescript hello";
const count = countWordOccurrences(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesRegex(text: string, word: string): number {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// Usage
const text = "Hello world hello typescript hello";
const count = countWordOccurrencesRegex(text, "hello");
console.log(count); // Output: 3
function countWordOccurrencesReduce(text: string, word: string): number {
  const searchWord = word.toLowerCase();
  return text
    .toLowerCase()
    .split(/\s+/)
    .reduce((count, currentWord) => 
      currentWord === searchWord ? count + 1 : count, 0);
}

// Usage
const text = "Hello world hello typescript hello";
const count = countWordOccurrencesReduce(text, "hello");
console.log(count); // Output: 3
interface CountOptions {
  caseSensitive?: boolean;
  wholeWord?: boolean;
}

function countWordOccurrencesEnhanced(
  text: string, 
  word: string, 
  options: CountOptions = {}
): number {
  const { caseSensitive = false, wholeWord = false } = options;
  
  let processedText = text;
  let processedWord = word;
  
  if (!caseSensitive) {
    processedText = text.toLowerCase();
    processedWord = word.toLowerCase();
  }
  
  if (wholeWord) {
    const regex = new RegExp(`\\b${processedWord}\\b`, 'g');
    const matches = processedText.match(regex);
    return matches ? matches.length : 0;
  } else {
    return processedText
      .split(/\s+/)
      .filter(w => w === processedWord)
      .length;
  }
}

// Usage examples
const text = "Hello world hello typescript hello";

// Case insensitive, partial matches
console.log(countWordOccurrencesEnhanced(text, "hello")); // 3

// Case sensitive
console.log(countWordOccurrencesEnhanced(text, "hello", { caseSensitive: true })); // 2

// Whole word only (matches word boundaries)
console.log(countWordOccurrencesEnhanced("helloworld hello", "hello", { wholeWord: true })); // 1
