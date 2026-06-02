function reverseString(s: string): string {
  // Split into an array of characters, reverse it, then join it back
  return s.split('').reverse().join('');
}
// Install first: npm install grapheme-splitter
import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

function reverseGraphemeString(s: string): string {
  const graphemes = splitter.splitGraphemes(s);
  return graphemes.reverse().join('');
}
const reverseStringAlt = (s: string) =>
  [...s].reduce((acc, ch) => ch + acc, '');
