/**
 * Returns the index of the first non‑repeating character.
 * If every character repeats, returns -1.
 *
 * @param s – the string to scan
 */
function firstNonRepeatingIndex(s: string): number {
  // 1️⃣ Count how many times each character occurs
  const freq = new Map<string, number>();

  for (const ch of s) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2️⃣ Scan again from the start, picking the first that has count 1
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) {
      return i;    // return the index, you can return the character with s[i]
    }
  }

  return -1; // no unique character found
}

// Demo
const txt = "mybobby";
const idx = firstNonRepeatingIndex(txt);

if (idx >= 0) {
  console.log(`First non‑repeating char: '${txt[idx]}' at position ${idx}`);
} else {
  console.log("All characters repeat");
}
