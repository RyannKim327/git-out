function countChar(str: string, char: string): number {
  if (char.length !== 1) throw new Error('char must be a single character');
  return str.split(char).length - 1;
}

console.log(countChar('mississippi', 's')); // 4
function countChar(str: string, char: string): number {
  if (char.length !== 1) throw new Error('char must be a single character');
  const matches = str.match(new RegExp(escapeRegExp(char), 'g'));
  return matches ? matches.length : 0;
}

// helper to avoid issues with special regex chars like ., *, etc.
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function countChar(str: string, char: string): number {
  if (char.length !== 1) throw new Error('char must be a single character');
  let count = 0;
  for (let i = 0; i < str.length; ++i) {
    if (str[i] === char) ++count;
  }
  return count;
}
const countChar = (str: string, char: string) =>
  [...str].reduce((n, c) => n + (c === char ? 1 : 0), 0);
const phrase = 'TypeScript is strongly typed!';
const tally = countChar(phrase, 't');
console.log(`The letter "t" occurs ${tally} times.`); // 3
