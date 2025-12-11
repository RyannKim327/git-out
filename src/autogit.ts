function countChar(str: string, char: string): number {
  if (char.length !== 1) throw new Error('char must be a single character');
  return [...str].filter(c => c === char).length;
}

/* example */
console.log(countChar('mississippi', 's')); // 4
console.log(countChar('🍕🍕🍔', '🍕'));     // 2  (works with Unicode code-points)
const count = (s: string, ch: string) => s.split(ch).length - 1;
