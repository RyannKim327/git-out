function countChar(str: string, char: string): number {
  if (char.length !== 1) throw new Error('char must be a single character');
  return [...str].filter(c => c === char).length;
}

/* ---------- usage ---------- */
const text = 'Mississippi';
console.log(countChar(text, 's')); // 4
console.log(countChar(text, 'i')); // 4
const count = (s: string, ch: string) =>
  (s.split(ch).length - 1);
const count = (s: string, ch: string) =>
  (s.match(new RegExp(ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
