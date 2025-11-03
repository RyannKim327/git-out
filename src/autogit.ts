function triangleAreaBaseHeight(base: number, height: number): number {
  return (base * height) / 2;
}

// Example usage:
const area = triangleAreaBaseHeight(10, 5); // Area = 25
function triangleAreaHeron(a: number, b: number, c: number): number {
  if (a <= 0 || b <= 0 || c <= 0) throw new Error("Sides must be positive");
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error("Invalid triangle: sides violate triangle inequality");
  }

  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage:
const area = triangleAreaHeron(3, 4, 5); // Area = 6 (right triangle)
type Point = { x: number; y: number };

function triangleAreaShoelace(p1: Point, p2: Point, p3: Point): number {
  const { x: x1, y: y1 } = p1;
  const { x: x2, y: y2 } = p2;
  const { x: x3, y: y3 } = p3;

  return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
}

// Example usage:
const pA = { x: 0, y: 0 };
const pB = { x: 4, y: 0 };
const pC = { x: 0, y: 3 };
const area = triangleAreaShoelace(pA, pB, pC); // Area = 6 (right triangle)
