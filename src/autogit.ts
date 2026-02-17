function areaBaseHeight(base: number, height: number): number {
  return (base * height) / 2;
}

// Example
const a = areaBaseHeight(10, 6);   // → 30
console.log(a);
function areaBySides(a: number, b: number, c: number): number {
  // Check triangle inequality first (optional but nice)
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('Not a valid triangle');
  }

  const s = (a + b + c) / 2;                // semi‑perimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return area;
}

// Example
const b = areaBySides(5, 12, 13);   // right triangle → 30
console.log(b);
const area = Math.sqrt(
  Math.max(0, s * (s - a) * (s - b) * (s - c))
);
