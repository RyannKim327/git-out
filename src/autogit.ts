function areaByBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) throw new Error("Base and height must be positive");
  return 0.5 * base * height;
}

console.log(areaByBaseHeight(10, 5)); // 25
function areaBySides(a: number, b: number, c: number): number {
  if (a <= 0 || b <= 0 || c <= 0) throw new Error("Sides must be positive");
  if (a + b <= c || a + c <= b || b + c <= a)
    throw new Error("Invalid triangle");

  const s = (a + b + c) / 2;          // semi-perimeter
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

console.log(areaBySides(7, 8, 9)); // ≈ 26.83
type Point = { x: number; y: number };

function areaByCoords(p1: Point, p2: Point, p3: Point): number {
  return Math.abs(
    (p1.x * (p2.y - p3.y) +
     p2.x * (p3.y - p1.y) +
     p3.x * (p1.y - p2.y)) / 2
  );
}

console.log(
  areaByCoords({ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 5, y: 5 }) // 25
);
