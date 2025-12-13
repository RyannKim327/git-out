function triangleAreaFromBaseHeight(base: number, height: number): number {
    return (base * height) / 2;
}

// Usage
const area = triangleAreaFromBaseHeight(10, 5);
console.log(area); // Output: 25
function triangleAreaFromSides(a: number, b: number, c: number): number {
    // Check if sides form a valid triangle
    if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error("Invalid triangle sides");
    }
    
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Usage
const area = triangleAreaFromSides(3, 4, 5);
console.log(area); // Output: 6
interface Point {
    x: number;
    y: number;
}

function triangleAreaFromCoordinates(
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
const area = triangleAreaFromCoordinates(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
);
console.log(area); // Output: 6
class Triangle {
    constructor(
        private sideA?: number,
        private sideB?: number,
        private sideC?: number,
        private base?: number,
        private height?: number
    ) {}

    // Calculate area using base and height
    areaFromBaseHeight(): number {
        if (!this.base || !this.height) {
            throw new Error("Base and height are required");
        }
        return (this.base * this.height) / 2;
    }

    // Calculate area using three sides
    areaFromSides(): number {
        if (!this.sideA || !this.sideB || !this.sideC) {
            throw new Error("Three sides are required");
        }
        
        const s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
    }
}

// Usage
const triangle = new Triangle(3, 4, 5);
console.log(triangle.areaFromSides()); // Output: 6

const triangle2 = new Triangle(undefined, undefined, undefined, 10, 5);
console.log(triangle2.areaFromBaseHeight()); // Output: 25
type TriangleCalculationMethod = 'base-height' | 'three-sides' | 'coordinates';

function calculateTriangleArea(
    method: TriangleCalculationMethod,
    ...args: number[] | Point[]
): number {
    switch (method) {
        case 'base-height':
            if (args.length !== 2) throw new Error("Need base and height");
            return (args[0] as number * args[1] as number) / 2;
            
        case 'three-sides':
            if (args.length !== 3) throw new Error("Need three sides");
            const [a, b, c] = args as number[];
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
            
        case 'coordinates':
            if (args.length !== 3) throw new Error("Need three points");
            const [p1, p2, p3] = args as Point[];
            return Math.abs(
                (p1.x * (p2.y - p3.y) +
                 p2.x * (p3.y - p1.y) +
                 p3.x * (p1.y - p2.y)) / 2
            );
            
        default:
            throw new Error("Invalid calculation method");
    }
}

// Usage examples
console.log(calculateTriangleArea('base-height', 10, 5)); // 25
console.log(calculateTriangleArea('three-sides', 3, 4, 5)); // 6
