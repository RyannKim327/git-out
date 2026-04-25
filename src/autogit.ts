function triangleAreaBaseHeight(
    base: number,
    height: number
): number {
    // Guard against negative or zero values
    if (base <= 0 || height <= 0) {
        throw new Error('Base and height must be positive numbers.');
    }
    return (base * height) / 2;
}

// Example usage
console.log(triangleAreaBaseHeight(10, 5)); // 25
function triangleAreaBySides(a: number, b: number, c: number): number {
    // Validate that sides can form a triangle
    if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error('The given sides do not form a valid triangle.');
    }

    const s = (a + b + c) / 2;
    const areaSquared = s * (s - a) * (s - b) * (s - c);

    // Numerical safety check: areaSquared should be non‑negative
    if (areaSquared < 0) {
        throw new Error('Computed a negative area; check your side lengths.');
    }

    return Math.sqrt(areaSquared);
}

// Example
console.log(triangleAreaBySides(3, 4, 5)); // 6
type TriangleSpec =
  | { base: number; height: number }
  | { a: number; b: number; c: number };

function areaOfTriangle(spec: TriangleSpec): number {
    if ('base' in spec && 'height' in spec) {
        return triangleAreaBaseHeight(spec.base, spec.height);
    } else {
        return triangleAreaBySides(spec.a, spec.b, spec.c);
    }
}
