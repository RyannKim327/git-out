function areaWithBaseHeight(base: number, height: number): number {
  return 0.5 * base * height;
}

// Example usage:
console.log(areaWithBaseHeight(10, 5)); // Output: 25
function areaWithSides(a: number, b: number, c: number): number {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage:
console.log(areaWithSides(3, 4, 5)); // Output: 6
