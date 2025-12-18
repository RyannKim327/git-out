/**
 * Returns the first non‑repeating character in `str`.
 *
 * @param str - The input string. May be empty.
 * @returns The first character that occurs exactly once, or null if none exists.
 *
 * @example
 *   firstNonRepeating('abacabad') // → 'c'
 *   firstNonRepeating('aabbcc')   // → null
 */
export function firstNonRepeating(str: string): string | null {
  // 1️⃣ Edge case – empty string
  if (!str) return null;

  // 2️⃣ First pass: count occurrences.
  // Using a Map preserves insertion order (not required for counting,
  // but handy for debugging) and works with any Unicode code point.
  const counts = new Map<string, number>();

  // Iterate over *code points* (not UTF‑16 code units) so emojis, surrogate pairs, etc.
  // are treated as a single character.
  for (const ch of str) {
    counts.set(ch, (counts.get(ch) ?? 0) + 1);
  }

  // 3️⃣ Second pass: find the first character with count === 1.
  for (const ch of str) {
    if (counts.get(ch) === 1) {
      return ch;
    }
  }

  // 4️⃣ No unique character found.
  return null;
}
export function firstNonRepeatingAscii(str: string): string | null {
  if (!str) return null;

  const counts: Record<string, number> = Object.create(null);
  for (let i = 0; i < str.length; ++i) {
    const ch = str[i];
    counts[ch] = (counts[ch] ?? 0) + 1;
  }

  for (let i = 0; i < str.length; ++i) {
    const ch = str[i];
    if (counts[ch] === 1) return ch;
  }

  return null;
}
export function firstNonRepeatingOnePass(str: string): string | null {
  if (!str) return null;

  interface Node {
    ch: string;
    prev?: Node;
    next?: Node;
  }

  const nodeMap = new Map<string, Node | null>(); // null means "already repeated"
  let head: Node | undefined;
  let tail: Node | undefined;

  const addNode = (ch: string) => {
    const node: Node = { ch };
    if (!head) {
      head = tail = node;
    } else {
      tail!.next = node;
      node.prev = tail;
      tail = node;
    }
    nodeMap.set(ch, node);
  };

  const removeNode = (node: Node) => {
    if (node.prev) node.prev.next = node.next;
    else head = node.next; // node was head

    if (node.next) node.next.prev = node.prev;
    else tail = node.prev; // node was tail
  };

  for (const ch of str) {
    const entry = nodeMap.get(ch);
    if (entry === undefined) {
      // first time we see it
      addNode(ch);
    } else if (entry !== null) {
      // second time – remove from list and mark as repeated
      removeNode(entry);
      nodeMap.set(ch, null);
    }
    // else entry === null → already repeated, nothing to do
  }

  return head?.ch ?? null;
}
import { firstNonRepeating } from './firstNonRepeating';

describe('firstNonRepeating', () => {
  test('basic examples', () => {
    expect(firstNonRepeating('abacabad')).toBe('c');
    expect(firstNonRepeating('aabbcc')).toBeNull();
    expect(firstNonRepeating('')).toBeNull();
    expect(firstNonRepeating('z')).toBe('z');
  });

  test('Unicode handling', () => {
    expect(firstNonRepeating('😀a😀b')).toBe('a');
    expect(firstNonRepeating('🧡🧡💙💚💙')).toBe('💚');
  });

  test('case sensitivity', () => {
    expect(firstNonRepeating('Aa')).toBe('A'); // 'A' and 'a' are different
  });

  test('long random string', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const make = (len: number) => {
      let s = '';
      for (let i = 0; i < len; ++i) s += chars[Math.floor(Math.random() * chars.length)];
      return s;
    };
    const str = make(100_000);
    // Just ensure it runs without blowing the stack / memory
    expect(() => firstNonRepeating(str)).not.toThrow();
  });
});
#!/usr/bin/env ts-node

import { firstNonRepeating } from './firstNonRepeating';

const input = process.argv[2] ?? '';
const result = firstNonRepeating(input);

if (result === null) {
  console.log('No non‑repeating character found.');
} else {
  console.log(`First non‑repeating character: '${result}'`);
}
$ ./find-first-unique.ts "swiss"
First non‑repeating character: 'w'
// Example for digits only
const digitCounts = new Uint8Array(10);
for (const ch of str) digitCounts[ch.charCodeAt(0) - 48]++; // '0' = 48
const firstNonRepeating = (s: string) =>
  [...s].find((c, _, a) => a.filter(x => x === c).length === 1) ?? null;
