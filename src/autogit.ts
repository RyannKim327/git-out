function areaByBaseHeight(base: number, height: number): number {
  return 0.5 * base * height;
}
function areaBySides(a: number, b: number, c: number): number {
  const s = (a + b + c) / 2;          // semi-perimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  if (isNaN(area)) throw new Error('Invalid triangle');
  return area;
}
function areaBySidesAngle(a: number, b: number, angle: number): number {
  return 0.5 * a * b * Math.sin(angle);
}
console.log(areaByBaseHeight(10, 5));        // 25
console.log(areaBySides(7, 8, 9));           // ≈26.83
console.log(areaBySidesAngle(7, 8, Math.PI / 3)); // ≈24.25
