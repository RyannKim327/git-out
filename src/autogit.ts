// Simple base & height
function areaFromBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new Error('base and height must be positive numbers');
  }
  return (base * height) / 2;
}

// Three side lengths (Heron’s formula)
function areaFromSides(a: number, b: number, c: number): number {
  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error('The side lengths do not form a triangle');
  }
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}
console.log(areaFromBaseHeight(10, 5)); // 25
console.log(areaFromSides(3, 4, 5));   // 6
const area = (b: number, h: number) => (b * h) / 2;
class Triangle {
  constructor(private a: number, private b: number, private c: number) {
    if (a + b <= c || a + c <= b || b + c <= a) {
      throw new Error('Invalid side lengths');
    }
  }

  public area(): number {
    const s = (this.a + this.b + this.c) / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }
}

// Usage
const tri = new Triangle(6, 7, 8);
console.log(tri.area()); // 20.784609690826528
function areaFromBaseHeight(base: number, height: number): number {
  if (base <= 0 || height <= 0) {
    throw new RangeError('Both base and height should be positive numbers');
  }
  return base * height / 2;
}
