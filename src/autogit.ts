function countChar(str: string, ch: string): number {
  // split on the target char and subtract 1 (the split always creates one
  // more slice than the number of matches)
  return str.split(ch).length - 1;
}

// Example
console.log(countChar("hello world", "l")); // 3
function countChar(str: string, ch: string): number {
  const matches = str.match(new RegExp(ch, "g")); // global search
  // If no matches, null is returned; length is 0 in that case
  return matches ? matches.length : 0;
}

// Example
console.log(countChar("hello world", "l")); // 3
const escaped = ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(escaped, "g");
function countChar(str: string, ch: string): number {
  let count = 0;
  for (const c of str) {
    if (c === ch) count++;
  }
  return count;
}

// Example
console.log(countChar("hello world", "l")); // 3
