function triangleArea(base: number, height: number): number {
    return (base * height) / 2;
}

// Usage
const area = triangleArea(10, 5);
console.log(area); // 25
function triangleAreaHeron(a: number, b: number, c: number): number {
    // Check if sides form a valid triangle
    if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error("Invalid triangle sides");
    }
    
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Usage
const area = triangleAreaHeron(3, 4, 5);
console.log(area); // 6
interface Point {
    x: number;
    y: number;
}

function triangleAreaCoordinates(p1: Point, p2: Point, p3: Point): number {
    return Math.abs(
        (p1.x * (p2.y - p3.y) + 
         p2.x * (p3.y - p1.y) + 
         p3.x * (p1.y - p2.y)) / 2
    );
}

// Usage
const area = triangleAreaCoordinates(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
);
console.log(area); // 6
class TriangleCalculator {
    // Method 1: Base and Height
    static fromBaseHeight(base: number, height: number): number {
        if (base <= 0 || height <= 0) {
            throw new Error("Base and height must be positive numbers");
        }
        return (base * height) / 2;
    }

    // Method 2: Heron's Formula
    static fromThreeSides(a: number, b: number, c: number): number {
        if (a <= 0 || b <= 0 || c <= 0) {
            throw new Error("Sides must be positive numbers");
        }
        
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle sides");
        }
        
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    // Method 3: Coordinates
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
function safeTriangleArea(base?: number, height?: number, sides?: number[]): number {
    if (base !== undefined && height !== undefined) {
        if (base <= 0 || height <= 0) {
            throw new Error("Base and height must be positive");
        }
        return (base * height) / 2;
    }
    
    if (sides && sides.length === 3) {
        const [a, b, c] = sides;
        if (a <= 0 || b <= 0 || c <= 0) {
            throw new Error("Sides must be positive");
        }
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle sides");
        }
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    
    throw new Error("Invalid parameters");
}

// Usage
console.log(safeTriangleArea(10, 5)); // 25
console.log(safeTriangleArea(undefined, undefined, [3, 4, 5])); // 6
