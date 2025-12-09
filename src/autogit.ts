// 1. When you know base and height
function triangleAreaBH(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error('Base and height must be positive numbers.');
  }
  return (base * height) / 2;
}

// 2. When you know the three sides (Heron’s formula)
function triangleAreaSSS(a: number, b: number, c: number): number {
  // Basic triangle inequality check
  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error('Side lengths must be positive.');
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('Invalid triangle sides.');
  }

  const s = (a + b + c) / 2;          // semi-perimeter
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

/* ---------- Usage examples ---------- */
console.log(triangleAreaBH(10, 5));   // 25
console.log(triangleAreaSSS(7, 8, 9)); // ≈ 26.83
