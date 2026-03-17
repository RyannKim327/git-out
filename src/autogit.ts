/**
 * Returns the area of a triangle when you know its base and height.
 *
 * @param base   The length of the triangle’s base.
 * @param height The height (altitude) drawn to that base.
 * @returns The area in whatever units the inputs are in.
 */
function triangleAreaFromBaseHeight(base: number, height: number): number {
  return 0.5 * base * height;
}
/**
 * Returns the area of a triangle given its three vertices.
 *
 * @param x1 x‑coordinate of the first vertex
 * @param y1 y‑coordinate of the first vertex
 * @param x2 x‑coordinate of the second vertex
 * @param y2 y‑coordinate of the second vertex
 * @param x3 x‑coordinate of the third vertex
 * @param y3 y‑coordinate of the third vertex
 * @returns The absolute area (non‑negative) of the triangle.
 */
function triangleAreaFromPoints(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number
): number {
  return Math.abs(
    x1 * (y2 - y3) +
    x2 * (y3 - y1) +
    x3 * (y1 - y2)
  ) / 2;
}
