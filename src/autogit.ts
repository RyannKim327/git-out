function manualLength(str: string): number {
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}
console.log(manualLength('hello'));   // 5
console.log(manualLength('👋🌍'));     // 2   (two emoji)
function utf16Length(str: string): number {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charAt(i);
    if (ch.length === 0) break;   // defensive: strings can be sliced
    len++;
  }
  return len;
}
function codePointCount(str: string): number {
  let i = 0;
  let count = 0;
  while (i < str.length) {
    const code = str.codePointAt(i)!;
    count++;
    i += code > 0xffff ? 2 : 1;  // skip surrogate pair if present
  }
  return count;
}
console.log(codePointCount('hello'));     // 5
console.log(codePointCount('👋🌍'));       // 2
console.log(codePointCount('𝟙𝟚𝟛'));       // 3 (mathematical bold numbers)
import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

function graphemeLength(str: string): number {
  return splitter.splitGraphemes(str).length;
}
const tests = [
  'hello',
  '👋',
  '👋👨‍👩‍👦', // family emoji composed of multiple code points and a zero‑width joiner
  'a\u0301e',   // a + acute accent
];

for (const s of tests) {
  console.log(`"${s}": manual=${manualLength(s)}, codePoint=${codePointCount(s)}`);
}
