function countChar(str: string, target: string): number {
  let count = 0;
  for (const ch of str) {
    if (ch === target) count++;
  }
  return count;
}
function countCharRegex(str: string, target: string): number {
  // Escape special regex chars in the target
  const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = str.match(new RegExp(escaped, 'g'));
  return matches ? matches.length : 0;
}
function countCharSplit(str: string, target: string): number {
  // Splitting on the target gives you one more element than the number of matches
  return str.split(target).length - 1;
}
const s = 'hello world, hello universe!';
console.log(countChar(s, 'l'));          // 3
console.log(countCharRegex(s, 'l'));    // 3
console.log(countCharSplit(s, 'l'));    // 3

console.log(countChar(s, ' '));          // 3
console.log(countCharRegex(s, ' '));    // 3
console.log(countCharSplit(s, ' '));    // 3
