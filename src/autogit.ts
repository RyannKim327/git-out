function triangleAreaBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error("Base and height must be positive numbers.");
  }
  return (base * height) / 2;
}

// Usage:
const area = triangleAreaBaseHeight(4, 3); // Returns 6
function triangleAreaHeron(a: number, b: number, c: number): number {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error("All sides must be positive numbers.");
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error("Invalid triangle sides: sum of any two sides must be greater than the third.");
  }
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Usage:
const area = triangleAreaHeron(3, 4, 5); // Returns 6
type Point = { x: number; y: number };

function triangleAreaCoordinates(p1: Point, p2: Point, p3: Point): number {
  const area = Math.abs(
    (p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y)) / 2
  );
  return area;
}

// Usage:
const area = triangleAreaCoordinates(
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 0, y: 3 }
); // Returns 6
// Base/Height
console.log(triangleAreaBaseHeight(4, 3)); // 6

// Heron (3,4,5 right triangle)
console.log(triangleAreaHeron(3, 4, 5)); // 6

// Coordinates (0,0; 4,0; 0,3)
console.log(triangleAreaCoordinates(
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 0, y: 3 }
)); // 6
