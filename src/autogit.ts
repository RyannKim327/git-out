/**
 * Area = (base * height) / 2
 */
function areaFromBaseHeight(base: number, height: number): number {
  return (base * height) / 2;
}

// Example
console.log(areaFromBaseHeight(10, 6)); // 30
/**
 * Shoelace / Gauss area formula for a polygon.
 * For a triangle (3 vertices) it simplifies nicely.
 */
function areaFromCoords(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number }
): number {
  const s1 = p2.x * p1.y - p1.x * p2.y;
  const s2 = p3.x * p2.y - p2.x * p3.y;
  const s3 = p1.x * p3.y - p3.x * p1.y;
  return Math.abs((s1 + s2 + s3) / 2);
}

// Example
console.log(
  areaFromCoords(
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 3 }
  )
); // 6
/**
 * Heron's formula:
 *   s = (a + b + c) / 2
 *   area = sqrt( s * (s - a) * (s - b) * (s - c) )
 */
function areaFromSides(a: number, b: number, c: number): number {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example
console.log(areaFromSides(5, 6, 7)); // ≈ 14.6969
