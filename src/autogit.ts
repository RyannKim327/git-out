function triangleAreaBaseHeight(base: number, height: number): number {
    return 0.5 * base * height;
}

// Usage
const area1 = triangleAreaBaseHeight(10, 5);
console.log(area1); // Output: 25
function triangleAreaHeron(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Usage
const area2 = triangleAreaHeron(3, 4, 5);
console.log(area2); // Output: 6
interface Point {
    x: number;
    y: number;
}

function triangleAreaCoordinates(
    pointA: Point, 
    pointB: Point, 
    pointC: Point
): number {
    return Math.abs(
        (pointA.x * (pointB.y - pointC.y) +
         pointB.x * (pointC.y - pointA.y) +
         pointC.x * (pointA.y - pointB.y)) / 2
    );
}

// Usage
const area3 = triangleAreaCoordinates(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
);
console.log(area3); // Output: 6
function triangleAreaSidesAngle(
    side1: number, 
    side2: number, 
    angleDegrees: number
): number {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    return 0.5 * side1 * side2 * Math.sin(angleRadians);
}

// Usage
const area4 = triangleAreaSidesAngle(4, 5, 30);
console.log(area4); // Output: 5
class TriangleCalculator {
    static areaFromBaseHeight(base: number, height: number): number {
        if (base <= 0 || height <= 0) {
            throw new Error("Base and height must be positive numbers");
        }
        return 0.5 * base * height;
    }

    static areaFromSides(a: number, b: number, c: number): number {
        if (a <= 0 || b <= 0 || c <= 0) {
            throw new Error("All sides must be positive numbers");
        }
        
        // Check triangle inequality theorem
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle: sum of any two sides must be greater than the third side");
        }
        
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    static areaFromVertices(
        x1: number, y1: number,
        x2: number, y2: number,
        x3: number, y3: number
    ): number {
        return Math.abs(
            (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
        );
    }
}

// Usage examples
try {
    console.log(TriangleCalculator.areaFromBaseHeight(10, 5)); // 25
    console.log(TriangleCalculator.areaFromSides(3, 4, 5));   // 6
    console.log(TriangleCalculator.areaFromVertices(0, 0, 4, 0, 0, 3)); // 6
} catch (error) {
    console.error(error.message);
}
