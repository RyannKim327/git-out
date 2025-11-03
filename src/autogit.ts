function calculateAreaFromBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error("Base and height must be positive numbers.");
  }
  return (base * height) / 2;
}

// Example usage:
const area = calculateAreaFromBaseHeight(10, 5); 
console.log(area); // Output: 25
function calculateAreaFromSides(a: number, b: number, c: number): number {
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error("Sides must be positive numbers.");
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error("Invalid triangle: sides do not form a valid triangle.");
  }

  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage:
const area = calculateAreaFromSides(3, 4, 5);
console.log(area); // Output: 6
Area = |(x1(y2 - y3) + x2(y3 - y1) + x3(y1 - y2)) / 2|
function calculateAreaFromVertices(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number
): number {
  return Math.abs(
    (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
  );
}

// Example usage:
const area = calculateAreaFromVertices(0, 0, 4, 0, 0, 3); 
console.log(area); // Output: 6
