function stringLength(s: string): number {
  let count = 0;
  for (const _ of s) {   // iterates over Unicode code points
    ++count;
  }
  return count;
}
function stringLengthCodeUnits(s: string): number {
  let count = 0;
  // `s[i]` returns `undefined` past the end of the string
  for (let i = 0; s[i] !== undefined; i++) {
    ++count;
  }
  return count;
}
function stringLengthCharAt(s: string): number {
  let count = 0;
  for (let i = 0; s.charAt(i) !== ''; i++) {
    ++count;
  }
  return count;
}
function* chars(s: string): Generator<unknown> {
  for (const c of s) { yield c; }
}

function stringLengthFunctional(s: string): number {
  let count = 0;
  for (const _ of chars(s)) { ++count; }
  return count;
}
console.log(stringLength("hello"));       // 5
console.log(stringLength("👋🌍"));        // 2  (two code points)
console.log(stringLengthCodeUnits("👋🌍")); // 4  (four UTF‑16 code units)
