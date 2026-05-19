/**
 * Area from base and height.
 * @param base  - Base length (any positive number)
 * @param height - Height length (any positive number)
 * @returns Triangle area
 */
function areaBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error('Base and height must be positive numbers.');
  }
  return (base * height) / 2;
}
const area = areaBaseHeight(10, 5); // 25
console.log(`Area = ${area}`);      // Area = 25
/**
 * Deal with three side lengths.
 * @param a - length of side a
 * @param b - length of side b
 * @param c - length of side c
 * @returns Triangle area
 */
function areaBySides(a: number, b: number, c: number): number {
  // Simple validity check – the sides must satisfy the triangle inequality
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('The given sides do not form a valid triangle.');
  }

  const s = (a + b + c) / 2;                 // semi‑perimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return area;
}
const areaHeron = areaBySides(3, 4, 5); // 6
console.log(`Area (Heron) = ${areaHeron}`);
/**
 * Area from two sides and an included angle (in degrees or radians).
 * @param side1   - length of one side
 * @param side2   - length of the other side
 * @param angle   - included angle (in degrees)
 * @param inRadians - optional flag indicating input is supplied in radians; defaults to false (degrees)
 * @returns Triangle area
 */
function areaFromSidesAndAngle(
  side1: number,
  side2: number,
  angle: number,
  inRadians = false
): number {
  if (side1 <= 0 || side2 <= 0) throw new Error('Side lengths must be positive.');

  const rad = inRadians ? angle : (angle * Math.PI) / 180;
  return (side1 * side2 * Math.sin(rad)) / 2;
}
const areaMixed = areaFromSidesAndAngle(5, 7, 60); // 15.25
console.log(`Area from two sides & angle = ${areaMixed}`);
