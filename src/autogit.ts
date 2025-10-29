function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}

// Example usage
const original = "Hello World TypeScript";
const reversed = reverseWords(original);
console.log(reversed); // "TypeScript World Hello"
function reverseWordsAdvanced(str: string): string {
  return str
    .trim()
    .split(/\s+/) // Split on one or more whitespace characters
    .reverse()
    .join(' ');
}

// Example usage
const text = "  Hello   World   TypeScript  ";
const result = reverseWordsAdvanced(text);
console.log(result); // "TypeScript World Hello"
function reverseWordsManual(str: string): string {
  const words: string[] = [];
  let currentWord = '';
  
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      if (currentWord) {
        words.push(currentWord);
        currentWord = '';
      }
    } else {
      currentWord += str[i];
    }
  }
  
  // Don't forget the last word
  if (currentWord) {
    words.push(currentWord);
  }
  
  // Reverse manually
  const reversedWords: string[] = [];
  for (let i = words.length - 1; i >= 0; i--) {
    reversedWords.push(words[i]);
  }
  
  return reversedWords.join(' ');
}
function reverseWordsFunctional(str: string): string {
  return str
    .split(' ')
    .reduce((reversed: string[], word: string) => {
      if (word) { // Filter out empty strings
        reversed.unshift(word);
      }
      return reversed;
    }, [])
    .join(' ');
}
// Test cases
const testCases = [
  "Hello World",
  "The quick brown fox",
  "  Multiple   spaces   here  ",
  "SingleWord",
  ""
];

testCases.forEach(test => {
  console.log(`Original: "${test}"`);
  console.log(`Reversed: "${reverseWordsAdvanced(test)}"`);
  console.log('---');
});
