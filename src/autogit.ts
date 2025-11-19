/**
 * Returns true when `a` and `b` are anagrams of each other.
 * Comparison is case–insensitive and ignores spaces / punctuation.
 */
function areAnagrams(a: string, b: string): boolean {
  const clean = (s: string) =>
    [...s.toLowerCase()]          // split into Unicode code-points
      .filter(c => /\p{L}/u.test(c)) // keep letters only
      .sort()
      .join('');

  return clean(a) === clean(b);
}

/* ---------- usage ---------- */
console.log(areAnagrams('Dormitory', 'Dirty room'));          // true
console.log(areAnagrams('Conversation', 'Voices rant on'));  // true
console.log(areAnagrams('Hello', 'Olelh'));                  // true
console.log(areAnagrams('Hello', 'World'));                  // false
