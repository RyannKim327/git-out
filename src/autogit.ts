function charCount(str: string, target: string): number {
  if (target.length !== 1) throw new Error('Target must be a single character');
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === target) count++;
  }
  return count;
}
function charCountSplit(str: string, target: string): number {
  if (target.length !== 1) throw new Error('Target must be a single character');
  return str.split(target).length - 1;
}
function charCountRegex(str: string, target: string): number {
  if (target.length !== 1) throw new Error('Target must be a single character');
  const re = new RegExp(escapeRegExp(target), 'g');
  const matches = str.match(re);
  return matches ? matches.length : 0;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function charCountReduce(str: string, target: string): number {
  if (target.length !== 1) throw new Error('Target must be a single character');
  return [...str].reduce((acc, ch) => acc + (ch === target ? 1 : 0), 0);
}
function charCountUtf16(str: string, target: string): number {
  if (target.length !== 1) throw new Error('Target must be a single character');
  const targetCode = target.charCodeAt(0);
  let count = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    if (str.charCodeAt(i) === targetCode) count++;
  }
  return count;
}
const text = "hello世界hello";

console.log(charCount(text, 'l')); // 3
console.log(charCountSplit(text, 'l')); // 3
console.log(charCountRegex(text, 'l')); // 3
console.log(charCountReduce(text, 'l')); // 3
