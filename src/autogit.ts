function countChar(str: string, ch: string): number {
  if (ch.length !== 1) throw new Error('Second argument must be a single character');
  return str.split(ch).length - 1;
}

console.log(countChar('mississippi', 's')); // 4
function countChar(str: string, ch: string): number {
  if (ch.length !== 1) throw new Error('Second argument must be a single character');
  const esc = ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex meta-chars
  const matches = str.match(new RegExp(esc, 'g'));
  return matches ? matches.length : 0;
}
function countChar(str: string, ch: string): number {
  if (ch.length !== 1) throw new Error('Second argument must be a single character');
  let count = 0;
  for (const c of str) if (c === ch) ++count;
  return count;
}
const countChar = (str: string, ch: string) =>
  [...str].reduce((n, c) => n + (c === ch ? 1 : 0), 0);
const text = 'TypeScript';
console.log(countChar(text, 'p')); // 1
console.log(countChar(text, 't')); // 2 (case-sensitive)
