function getLength(str: string): number {
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}
function recurseLen(str: string, idx = 0): number {
  return idx >= str.length ? idx : recurseLen(str, idx + 1);
}
function recurseLen(str: string, idx = 0): number {
  return str === '' ? idx : recurseLen(str.slice(1), idx + 1);
}
function lengthFromArray(str: string): number {
  return Array.from(str).length; // still uses .length on the array
}
function lengthSpread(str: string): number {
  return [...str].length; // element count after spreading
}
function lengthWithMatch(str: string): number {
  const matches = str.match(/[\s\S]/g); // one match per character, including newlines
  return matches ? matches.length : 0;
}
function whileLoop(str: string): number {
  let i = 0;
  while (str.charAt(i) !== '') {
    i++;
  }
  return i;
}
