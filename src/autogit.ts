function countChar(str: string, ch: string): number {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ch) count++;
  }
  return count;
}
const count = str.split(ch).length - 1;
function countCharWithRegex(str: string, ch: string): number {
  // Escape regex metacharacters in case ch is not a plain letter
  const escaped = ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, 'g');
  const matches = str.match(re);
  return matches ? matches.length : 0;
}
const count = [...str].reduce((acc, c) => acc + (c === ch ? 1 : 0), 0);
const count = [...str.toUpperCase()].filter(c => c === ch.toUpperCase()).length;
const test = "hello world, hello TypeScript!";
console.log(countChar(test, "l")); // 8
console.log(countChar(test, "H")); // 1
console.log(countChar(test, "o")); // 3
