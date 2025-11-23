function areaByBaseHeight(base: number, height: number): number {
  return 0.5 * base * height;
}

console.log(areaByBaseHeight(10, 4)); // 20
function areaBySides(a: number, b: number, c: number): number {
  // Optional: validate triangle inequality
  if (a + b <= c || a + c <= b || b + c <= a)
    throw new Error("Invalid triangle");

  const s = (a + b + c) / 2;          // semi-perimeter
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

console.log(areaBySides(7, 8, 9));    // ≈ 26.83
type Point = { x: number; y: number };

function areaByVertices(A: Point, B: Point, C: Point): number {
  return Math.abs(
    (A.x * (B.y - C.y) +
     B.x * (C.y - A.y) +
     C.x * (A.y - B.y)) / 2
  );
}

const P1 = { x: 0, y: 0 };
const P2 = { x: 10, y: 0 };
const P3 = { x: 5, y: 5 };
console.log(areaByVertices(P1, P2, P3)); // 25
