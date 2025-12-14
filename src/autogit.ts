function areaWithBaseHeight(base: number, height: number): number {
    return (base * height) / 2;
}

// Example usage
const area = areaWithBaseHeight(10, 5); // Returns 25
function areaWithThreeSides(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // Semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage
const area = areaWithThreeSides(3, 4, 5); // Returns 6
function areaWithSidesAndAngle(
    side1: number, 
    side2: number, 
    angleInDegrees: number
): number {
    const angleInRadians = (angleInDegrees * Math.PI) / 180;
    return (side1 * side2 * Math.sin(angleInRadians)) / 2;
}

// Example usage
const area = areaWithSidesAndAngle(5, 7, 45); // Returns approximately 12.37
interface Point {
    x: number;
    y: number;
}

function areaWithCoordinates(A: Point, B: Point, C: Point): number {
    return Math.abs(
        (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2
    );
}

// Example usage
const area = areaWithCoordinates(
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 3 }
); // Returns 6
class TriangleCalculator {
    // Using base and height
    static areaWithBaseHeight(base: number, height: number): number {
        if (base <= 0 || height <= 0) {
            throw new Error("Base and height must be positive numbers");
        }
        return (base * height) / 2;
    }

    // Using three sides (Heron's formula)
    static areaWithThreeSides(a: number, b: number, c: number): number {
        if (a <= 0 || b <= 0 || c <= 0) {
            throw new Error("All sides must be positive numbers");
        }
        
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("These sides cannot form a valid triangle");
        }
        
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    // Using coordinates
    static areaWithCoordinates(A: Point, B: Point, C: Point): number {
        return Math.abs(
            (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y)) / 2
        );
    }
}

// Usage examples
try {
    console.log(TriangleCalculator.areaWithBaseHeight(8, 6)); // 24
    console.log(TriangleCalculator.areaWithThreeSides(5, 6, 7)); // ~14.7
    console.log(TriangleCalculator.areaWithCoordinates(
        { x: 1, y: 1 },
        { x: 4, y: 1 },
        { x: 1, y: 5 }
    )); // 6
} catch (error) {
    console.error("Error:", error.message);
}
