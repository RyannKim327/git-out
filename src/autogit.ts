/**
 * Calculates area when you know the base and the altitude
 * @param base   the length of the base
 * @param height the altitude perpendicular to the base
 * @returns area of the triangle
 */
function areaBaseHeight(base: number, height: number): number {
  return (base * height) / 2;
}

// Example
const area1 = areaBaseHeight(10, 5);   // 25
/**
 * Calculates area from the three sides using Heron's formula
 * @param a side a
 * @param b side b
 * @param c side c
 * @returns area of the triangle
 * @throws Error if the sides cannot form a triangle
 */
function areaHeron(a: number, b: number, c: number): number {
  // Validate triangle inequality
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('The provided sides do not form a triangle.');
  }

  const s = (a + b + c) / 2;                       // semi‑perimeter
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example
const area2 = areaHeron(3, 4, 5);   // 6
interface Point { x: number; y: number }

function areaFromCoords(p1: Point, p2: Point, p3: Point): number {
  return Math.abs(
    (p1.x * (p2.y - p3.y) +
     p2.x * (p3.y - p1.y) +
     p3.x * (p1.y - p2.y)) / 2
  );
}

// Example
const area3 = areaFromCoords(
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 0, y: 3 }
);   // 6
