function firstRepeatedChar(str: string): string | undefined {
  const seen = new Set<string>();

  for (const ch of str) {
    if (seen.has(ch)) {
      return ch;            // first duplicate encountered
    }
    seen.add(ch);
  }
  return undefined;          // no repeats
}
console.log(firstRepeatedChar("hello"));  // "l"
console.log(firstRepeatedChar("abc"));    // undefined
console.log(firstRepeatedChar(""));       // undefined
function firstRepeatedCharWithIndex(str: string): {char: string, index: number} | undefined {
  const seen = new Set<string>();

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (seen.has(ch)) {
      return { char: ch, index: i };
    }
    seen.add(ch);
  }
  return undefined;
}
