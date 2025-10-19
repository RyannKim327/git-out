function areaByBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) throw new Error('base and height must be positive');
  return (base * height) / 2;
}

console.log(areaByBaseHeight(10, 5)); // 25
function areaBySides(a: number, b: number, c: number): number {
  if (a <= 0 || b <= 0 || c <= 0) throw new Error('sides must be positive');
  if (a + b <= c || a + c <= b || b + c <= a)
    throw new Error('invalid triangle');

  const s = (a + b + c) / 2;           // semi-perimeter
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

console.log(areaBySides(7, 8, 9));   // ≈ 26.83
type Point = { x: number; y: number };

function areaByVertices(A: Point, B: Point, C: Point): number {
  return Math.abs(
    (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2
  );
}

const A: Point = { x: 0, y: 0 };
const B: Point = { x: 4, y: 0 };
const C: Point = { x: 0, y: 3 };
console.log(areaByVertices(A, B, C)); // 6
function areaBySas(a: number, b: number, gammaDeg: number): number {
  const gammaRad = (gammaDeg * Math.PI) / 180;
  return 0.5 * a * b * Math.sin(gammaRad);
}

console.log(areaBySas(5, 6, 60)); // ≈ 12.99
