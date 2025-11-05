function countChar(str: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('Second argument must be a single character');
  }
  return [...str].filter(c => c === char).length;
}

// examples
console.log(countChar('hello', 'l'));      // 2
console.log(countChar('🚀🚀🚀', '🚀'));   // 3  (surrogate pairs safe)
const count = (s: string, ch: string) =>
  (s.match(new RegExp(ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
