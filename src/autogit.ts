// 1️⃣ Base & height
export function areaBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0)
    throw new Error('Base and height must be positive numbers.');
  return (base * height) / 2;
}

// 2️⃣ Heron’s formula (three sides)
export function areaHeron(a: number, b: number, c: number): number {
  // Validate that the sides can form a triangle
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('Side lengths must be positive numbers.');
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('The provided sides do not satisfy the triangle inequality.');
  }

  const s = (a + b + c) / 2;                // semi‑perimeter
  const areaSquared = s * (s - a) * (s - b) * (s - c);

  // area might be NaN if the vertices are collinear (area close to 0)
  if (areaSquared < 0) {
    throw new Error('Computed area squared is negative – check your side lengths.');
  }

  return Math.sqrt(areaSquared);
}
// Base & height
const tri1 = areaBaseHeight(10, 4); // 20

// Heron’s formula
const tri2 = areaHeron(3, 4, 5);     // 6  – right‑triangle check

console.log(`Base/Height area: ${tri1}`);
console.log(`Heron area: ${tri2}`);
