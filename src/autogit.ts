function reverseWords(str: string): string {
  return str.trim().split(/\s+/).reverse().join(' ');
}
const sentence = "Hello World from TypeScript";
console.log(reverseWords(sentence)); // "TypeScript from World Hello"
function reverseWordsPreserveWhitespace(str: string): string {
  return str.split(/(\s+)/).reverse().join('');
}
