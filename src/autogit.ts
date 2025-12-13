function triangleArea(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error("Base and height must be positive numbers.");
  }
  return 0.5 * base * height;
}

// Example usage:
const area = triangleArea(10, 5);
console.log(`Area of triangle: ${area}`); // Output: Area of triangle: 25
