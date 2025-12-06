function triangleAreaByBaseHeight(base: number, height: number): number {
  return (base * height) / 2;
}

// Example usage
const area = triangleAreaByBaseHeight(10, 5); // Area = 25
console.log(area);
function triangleAreaBySides(a: number, b: number, c: number): number {
  // Check if sides form a valid triangle
  const isValidTriangle = a + b > c && a + c > b && b + c > a;
  if (!isValidTriangle || a <= 0 || b <= 0 || c <= 0) {
    throw new Error("Invalid triangle sides.");
  }

  const s = (a + b + c) / 2; // Semi-perimeter
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  return area;
}

// Example usage
try {
  const area = triangleAreaBySides(3, 4, 5); // Right-angled triangle -> Area = 6
  console.log(area);
} catch (error) {
  console.error(error.message);
}
