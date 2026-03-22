/**
 * Returns the first character that appears only once.
 * If all characters repeat, null is returned.
 */
function firstNonRepeating(str: string): string | null {
  // Build a frequency map
  const freq = new Map<string, number>();
  for (const ch of str) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // Find the first character with a count of 1
  for (const ch of str) {
    if (freq.get(ch) === 1) return ch;
  }

  return null;   // nothing found
}

// --- examples -------------------------------------------------
console.log(firstNonRepeating('abacabad')); // "c"
console.log(firstNonRepeating('aabbcc'));   // null
function firstNonRepeatingOnePass(str: string): string | null {
  const counts: Record<string, number> = {};
  const queue: string[] = [];

  for (const ch of str) {
    counts[ch] = (counts[ch] ?? 0) + 1;
    if (counts[ch] === 1) queue.push(ch);

    // purge invalid candidates from the front
    while (queue.length && counts[queue[0]] > 1) queue.shift();
  }

  return queue.length ? queue[0] : null;
}
