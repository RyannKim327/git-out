function reverseString(str: string): string {
  return str.split('').reverse().join('');
}
function reverseStringLoop(str: string): string {
  let out = '';
  for (let i = str.length - 1; i >= 0; i--) {
    out += str[i];
  }
  return out;
}
function reverseStringSpread(str: string): string {
  return [...str].reverse().join('');
}
import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

function reverseStringUnicode(str: string): string {
  return splitter.splitGraphemes(str).reverse().join('');
}
