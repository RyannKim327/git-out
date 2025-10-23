function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}

// Example usage
const input = "Hello World TypeScript";
const result = reverseWords(input); // "TypeScript World Hello"
console.log(result);
function reverseWordsAdvanced(str: string): string {
  // Trim whitespace, split by one or more spaces, reverse, and join
  return str.trim().split(/\s+/).reverse().join(' ');
}

// Examples
console.log(reverseWordsAdvanced("Hello   World  TypeScript")); 
// "TypeScript World Hello"

console.log(reverseWordsAdvanced("  SingleWord  ")); 
// "SingleWord"

console.log(reverseWordsAdvanced("")); 
// ""
function reverseWordsManual(str: string): string {
  const words: string[] = [];
  let currentWord = '';
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      currentWord += str[i];
    } else if (currentWord !== '') {
      words.push(currentWord);
      currentWord = '';
    }
  }
  
  // Don't forget the last word
  if (currentWord !== '') {
    words.push(currentWord);
  }
  
  // Reverse the array
  const reversedWords: string[] = [];
  for (let i = words.length - 1; i >= 0; i--) {
    reversedWords.push(words[i]);
  }
  
  return reversedWords.join(' ');
}

// Example usage
console.log(reverseWordsManual("Hello World TypeScript")); 
// "TypeScript World Hello"
function reverseWordsFunctional(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .reduce((reversed: string[], word: string) => [word, ...reversed], [])
    .join(' ');
}

// Example usage
console.log(reverseWordsFunctional("Hello World TypeScript")); 
// "TypeScript World Hello"
function reverseWordsSafe(str: string): string {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  
  if (str.trim() === '') {
    return '';
  }
  
  return str.trim().split(/\s+/).reverse().join(' ');
}

// Test cases
const testCases = [
  "Hello World TypeScript",
  "  Multiple   Spaces   Here  ",
  "SingleWord",
  "",
  "   ",
  "a b c d e"
];

testCases.forEach(test => {
  console.log(`"${test}" -> "${reverseWordsSafe(test)}"`);
});
