function areaByBaseHeight(base: number, height: number): number {
    return (base * height) / 2;
}

// Usage
const area = areaByBaseHeight(10, 5);
console.log(area); // Output: 25
function areaByHeron(a: number, b: number, c: number): number {
    // Check if triangle is valid
    if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error("Invalid triangle sides");
    }
    
    const s = (a + b + c) / 2; // Semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Usage
const area = areaByHeron(3, 4, 5);
console.log(area); // Output: 6
interface Point {
    x: number;
    y: number;
}

function areaByCoordinates(p1: Point, p2: Point, p3: Point): number {
    return Math.abs(
        (p1.x * (p2.y - p3.y) + 
         p2.x * (p3.y - p1.y) + 
         p3.x * (p1.y - p2.y)) / 2
    );
}

// Usage
const area = areaByCoordinates(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
);
console.log(area); // Output: 6
function areaByTrigonometry(side1: number, side2: number, angleDegrees: number): number {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    return (side1 * side2 * Math.sin(angleRadians)) / 2;
}

// Usage
const area = areaByTrigonometry(5, 6, 30);
console.log(area); // Output: 7.5
class TriangleCalculator {
    // Base and height method
    static areaByBaseHeight(base: number, height: number): number {
        if (base <= 0 || height <= 0) {
            throw new Error("Base and height must be positive numbers");
        }
        return (base * height) / 2;
    }

    // Heron's formula method
    static areaByThreeSides(a: number, b: number, c: number): number {
        if (a <= 0 || b <= 0 || c <= 0) {
            throw new Error("All sides must be positive numbers");
        }
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle sides");
        }
        
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    // Coordinates method
    static areaByCoordinates(p1: {x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}): number {
        return Math.abs(
            (p1.x * (p2.y - p3.y) + 
             p2.x * (p3.y - p1.y) + 
             p3.x * (p1.y - p2.y)) / 2
        );
    }
}

// Usage examples
try {
    console.log("Base & Height:", TriangleCalculator.areaByBaseHeight(10, 5));
    console.log("Three Sides:", TriangleCalculator.areaByThreeSides(3, 4, 5));
    console.log("Coordinates:", TriangleCalculator.areaByCoordinates(
        {x: 0, y: 0},
        {x: 4, y: 0},
        {x: 0, y: 3}
    ));
} catch (error) {
    console.error("Error:", error.message);
}
