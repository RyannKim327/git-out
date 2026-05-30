function countChar(str: string, char: string): number {
  if (char.length !== 1) throw new Error('char must be a single character');
  return str.split(char).length - 1;
}
function countChar(str: string, char: string): number {
  let count = 0;
  for (const c of str) {
    if (c === char) count++;
  }
  return count;
}
function countChar(str: string, char: string): number {
  const escaped = char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape special chars
  const regex = new RegExp(escaped, 'g');
  const matches = str.match(regex);
  return matches ? matches.length : 0;
}
const sentence = "hello world";
console.log(countChar(sentence, 'l')); // 3
console.log(countChar(sentence, ' ')); // 1
console.log(countChar(sentence, 'z')); // 0
