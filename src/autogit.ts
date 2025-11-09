function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);          // O(n) build
  return [...new Set(a)].filter(x => setB.has(x)); // keep only shared
}

console.log(intersection([1, 2, 2, 3], [2, 3, 4])); // → [2, 3]
function intersectionKeepDups<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter(x => setB.has(x)); // keeps order & duplicates from `a`
}

console.log(intersectionKeepDups([1, 2, 2, 3], [2, 3, 3, 3])); // → [2, 2, 3]
function bagIntersection<T>(a: T[], b: T[]): T[] {
  const counts = new Map<T, number>();
  for (const x of b) counts.set(x, (counts.get(x) || 0) + 1);

  const out: T[] = [];
  for (const x of a) {
    const c = counts.get(x);
    if (c && c > 0) {
      out.push(x);
      counts.set(x, c - 1);
    }
  }
  return out;
}

console.log(bagIntersection([1, 2, 2, 3], [2, 2, 2, 3])); // → [2, 2, 3]
