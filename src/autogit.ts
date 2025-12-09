function countWordOccurrences(text: string, word: string): number {
  return text.split(word).length - 1;
}

// Example:
const str = "apple banana apple orange apple";
console.log(countWordOccurrences(str, "apple")); // 3
function countWholeWordOccurrences(text: string, word: string): number {
  const regex = new RegExp(`\\b${word}\\b`, 'gi'); // \b = word boundary
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

// Example:
const str = "Apple banana apple orange pineapple APPLE";
console.log(countWholeWordOccurrences(str, "apple")); // 3
function countByReduce(text: string, word: string): number {
  return text
    .toLowerCase()
    .split(/\s+/)
    .reduce((count, current) => current === word.toLowerCase() ? count + 1 : count, 0);
}

const str = "Apple banana apple orange";
console.log(countByReduce(str, "apple")); // 2
