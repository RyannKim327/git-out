function firstRepeat(s: string): string | undefined {
  const seen = new Set<string>();

  for (const ch of s) {
    if (seen.has(ch)) return ch;   // this is the first repeated one
    seen.add(ch);
  }

  return undefined;   // no repeats
}
function firstRepeatObj(s: string): string | undefined {
  const map: { [k: string]: boolean } = {};

  for (const ch of s) {
    if (map[ch]) return ch;
    map[ch] = true;
  }
}
function firstRepeatingAlpha(str: string): string | undefined {
  const seen = new Set<string>();
  for (const ch of str) {
    if (!/[a-zA-Z]/.test(ch)) continue; // skip non‑letters
    if (seen.has(ch)) return ch;
    seen.add(ch);
  }
}
console.log(firstRepeat('abcdeafg')); // a
console.log(firstRepeat('hello world')); // l
console.log(firstRepeat('xyz')); // undefined
