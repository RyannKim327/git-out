function triangleArea(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error("Base and height must be positive numbers");
  }
  return 0.5 * base * height;
}

// usage
console.log(triangleArea(10, 4)); // 20
function triangleAreaHeron(a: number, b: number, c: number): number {
  // basic triangle inequality
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error("Invalid triangle sides");
  }
  const s = (a + b + c) / 2;        // semi-perimeter
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// usage
console.log(triangleAreaHeron(7, 8, 9)); // ≈ 26.8328
