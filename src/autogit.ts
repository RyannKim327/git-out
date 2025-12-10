function calculateAreaWithBaseHeight(base: number, height: number): number {
    return 0.5 * base * height;
}

// Example usage
const area1 = calculateAreaWithBaseHeight(10, 5);
console.log(area1); // Output: 25
function calculateAreaWithSides(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // Semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage
const area2 = calculateAreaWithSides(3, 4, 5);
console.log(area2); // Output: 6
interface Point {
    x: number;
    y: number;
}

function calculateAreaWithPoints(p1: Point, p2: Point, p3: Point): number {
    return Math.abs(
        (p1.x * (p2.y - p3.y) + 
         p2.x * (p3.y - p1.y) + 
         p3.x * (p1.y - p2.y)) / 2
    );
}

// Example usage
const area3 = calculateAreaWithPoints(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
);
console.log(area3); // Output: 6
class TriangleCalculator {
    // Base and height method
    static fromBaseHeight(base: number, height: number): number {
        if (base <= 0 || height <= 0) {
            throw new Error("Base and height must be positive numbers");
        }
        return 0.5 * base * height;
    }

    // Three sides method
    static fromThreeSides(a: number, b: number, c: number): number {
        if (a <= 0 || b <= 0 || c <= 0) {
            throw new Error("All sides must be positive numbers");
        }
        
        // Check triangle inequality
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle: sides do not satisfy triangle inequality");
        }
        
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    // Coordinates method
    static fromCoordinates(p1: Point, p2: Point, p3: Point): number {
        return Math.abs(
            (p1.x * (p2.y - p3.y) + 
             p2.x * (p3.y - p1.y) + 
             p3.x * (p1.y - p2.y)) / 2
        );
    }
}

// Usage examples
console.log(TriangleCalculator.fromBaseHeight(10, 5)); // 25
console.log(TriangleCalculator.fromThreeSides(3, 4, 5)); // 6
console.log(TriangleCalculator.fromCoordinates(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
)); // 6
