function calculateArea(base: number, height: number): number {
    return 0.5 * base * height;
}

// Example usage
const area = calculateArea(10, 5);
console.log(area); // Output: 25
function calculateAreaWithSides(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage
const area = calculateAreaWithSides(3, 4, 5);
console.log(area); // Output: 6
interface Point {
    x: number;
    y: number;
}

function calculateAreaWithCoordinates(p1: Point, p2: Point, p3: Point): number {
    return Math.abs(
        (p1.x * (p2.y - p3.y) + 
         p2.x * (p3.y - p1.y) + 
         p3.x * (p1.y - p2.y)) / 2
    );
}

// Example usage
const area = calculateAreaWithCoordinates(
    { x: 0, y: 0 },
    { x: 4, y: 0 },
    { x: 0, y: 3 }
);
console.log(area); // Output: 6
class TriangleCalculator {
    // Using base and height
    static fromBaseHeight(base: number, height: number): number {
        if (base <= 0 || height <= 0) {
            throw new Error("Base and height must be positive numbers");
        }
        return 0.5 * base * height;
    }

    // Using Heron's formula
    static fromThreeSides(a: number, b: number, c: number): number {
        if (a <= 0 || b <= 0 || c <= 0) {
            throw new Error("All sides must be positive numbers");
        }
        
        // Check triangle inequality
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle: sides don't satisfy triangle inequality");
        }

        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    // Using coordinates
    static fromCoordinates(p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }): number {
        const area = Math.abs(
            (p1.x * (p2.y - p3.y) + 
             p2.x * (p3.y - p1.y) + 
             p3.x * (p1.y - p2.y)) / 2
        );
        
        if (area === 0) {
            throw new Error("Points are collinear - not a valid triangle");
        }
        
        return area;
    }
}

// Usage examples
try {
    console.log("Base-Height:", TriangleCalculator.fromBaseHeight(10, 5)); // 25
    console.log("Three Sides:", TriangleCalculator.fromThreeSides(3, 4, 5)); // 6
    console.log("Coordinates:", TriangleCalculator.fromCoordinates(
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 3 }
    )); // 6
} catch (error) {
    console.error("Error:", error.message);
}
