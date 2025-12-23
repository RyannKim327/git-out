function manualLength(str: string): number {
  let count = 0;
  // Keep reading characters until we hit `undefined`
  for (let i = 0; ; i++) {
    if (str[i] === undefined) break; // past the end of the string
    count++;
  }
  return count;
}
function whileLength(str: string): number {
  let i = 0;
  while (str.charAt(i) !== '') {
    i++;
  }
  return i;
}
function recursiveLength(str: string, idx = 0): number {
  // Base case: no character at this index → we’re past the end
  return str[idx] === undefined ? idx : recursiveLength(str, idx + 1);
}
function codePointLength(str: string): number {
  let count = 0;
  for (const _ of str) {
    // The loop iterates once per *code point* (not per 16‑bit unit)
    count++;
  }
  return count;
}
function reduceLength(str: string): number {
  let count = 0;
  // Spread the string into an array of code points, then reduce.
  // The spread operator itself does not use `.length` on the string.
  for (const _ of str) count++;
  return count;
}
const samples = [
  '',
  'hello',
  '😀',               // single emoji (2 UTF‑16 units)
  'a😀b',            // mixed ASCII + emoji
  '𝟘𝟙𝟚𝟛',           // mathematical bold digits (each 2 units)
];

for (const s of samples) {
  console.log('---');
  console.log(`String: "${s}"`);
  console.log('manualLength (code units):', manualLength(s));
  console.log('whileLength (code units): ', whileLength(s));
  console.log('recursiveLength (code units):', recursiveLength(s));
  console.log('codePointLength (code points):', codePointLength(s));
}
---
String: ""
manualLength (code units): 0
whileLength (code units):  0
recursiveLength (code units): 0
codePointLength (code points): 0
---
String: "hello"
manualLength (code units): 5
whileLength (code units):  5
recursiveLength (code units): 5
codePointLength (code points): 5
---
String: "😀"
manualLength (code units): 2
whileLength (code units):  2
recursiveLength (code units): 2
codePointLength (code points): 1
...
// Count UTF‑16 code units without .length
function manualLength(str: string): number {
  let cnt = 0;
  for (let i = 0; ; i++) {
    if (str[i] === undefined) break;
    cnt++;
  }
  return cnt;
}

// Count Unicode code points (handles emojis, surrogate pairs)
function codePointLength(str: string): number {
  let cnt = 0;
  for (const _ of str) cnt++;
  return cnt;
}
