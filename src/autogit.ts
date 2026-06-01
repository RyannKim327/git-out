function reverseWords(str: string): string {
  // `trim()` removes leading/trailing whitespace, and `split(/\s+/)` collapses
  // multiple separators into one array element.
  const words = str.trim().split(/\s+/);
  return words.reverse().join(' ');
}

// Example
console.log(reverseWords('Hello world from TypeScript'));
// → 'TypeScript from world Hello'
function reverseWordsReducer(str: string): string {
  const words: string[] = [];
  let word = '';

  // Walk the string backwards
  for (let i = str.length - 1; i >= 0; i--) {
    const ch = str[i];

    if (ch.match(/\s/)) {
      // When we hit whitespace, push a word if we’ve accumulated one
      if (word) {
        words.push(word.split('').reverse().join(''));
        word = '';
      }
    } else {
      // Build the word backwards
      word += ch;
    }
  }

  // Push the final word (if any)
  if (word) {
    words.push(word.split('').reverse().join(''));
  }

  return words.join(' ');
}

console.log(reverseWordsReducer('TypeScript 2024:    Enjoy   coding!'));
// → 'coding! Enjoy 2024: TypeScript'
const reverse = (s: string) => s.match(/\S+/g)?.reverse().join(' ') ?? '';
console.log(reverseWords(''));               // ''
console.log(reverseWords('   '));             // ''
console.log(reverseWords('single'));          // 'single'
console.log(reverseWords('a b   c d'));       // 'd c b a'
