function triangleAreaBaseHeight(base: number, height: number): number {
    return (base * height) / 2;
}

// Example usage
const area1 = triangleAreaBaseHeight(10, 5); // 25
console.log(area1);
function triangleAreaHeron(a: number, b: number, c: number): number {
    // Check if sides form a valid triangle
    if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error("Invalid triangle: sides do not satisfy triangle inequality");
    }
    
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage
const area2 = triangleAreaHeron(3, 4, 5); // 6
console.log(area2);
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

// Example usage
const area3 = triangleAreaCoordinates(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
); // 6
console.log(area3);
class Triangle {
    constructor(
        private sideA?: number,
        private sideB?: number,
        private sideC?: number,
        private base?: number,
        private height?: number,
        private points?: [Point, Point, Point]
    ) {}
    
    // Method using base and height
    areaFromBaseHeight(): number {
        if (!this.base || !this.height) {
            throw new Error("Base and height are required");
        }
        return (this.base * this.height) / 2;
    }
    
    // Method using Heron's formula
    areaFromSides(): number {
        if (!this.sideA || !this.sideB || !this.sideC) {
            throw new Error("All three sides are required");
        }
        
        const a = this.sideA, b = this.sideB, c = this.sideC;
        
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle sides");
        }
        
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    
    // Method using coordinates
    areaFromCoordinates(): number {
        if (!this.points || this.points.length !== 3) {
            throw new Error("Three points are required");
        }
        
        const [p1, p2, p3] = this.points;
        return Math.abs(
            (p1.x * (p2.y - p3.y) + 
             p2.x * (p3.y - p1.y) + 
             p3.x * (p1.y - p2.y)) / 2
        );
    }
}

// Example usage
const triangle1 = new Triangle(undefined, undefined, undefined, 10, 5);
console.log(triangle1.areaFromBaseHeight()); // 25

const triangle2 = new Triangle(3, 4, 5);
console.log(triangle2.areaFromSides()); // 6

const triangle3 = new Triangle(
    undefined, undefined, undefined, undefined, undefined,
    [{x: 0, y: 0}, {x: 4, y: 0}, {x: 0, y: 3}]
);
console.log(triangle3.areaFromCoordinates()); // 6
type TriangleData = 
    | { type: 'baseHeight'; base: number; height: number }
    | { type: 'sides'; a: number; b: number; c: number }
    | { type: 'coordinates'; points: [Point, Point, Point] };

function calculateTriangleArea(data: TriangleData): number {
    switch (data.type) {
        case 'baseHeight':
            return (data.base * data.height) / 2;
        
        case 'sides':
            const s = (data.a + data.b + data.c) / 2;
            return Math.sqrt(s * (s - data.a) * (s - data.b) * (s - data.c));
        
        case 'coordinates':
            const [p1, p2, p3] = data.points;
            return Math.abs(
                (p1.x * (p2.y - p3.y) + 
                 p2.x * (p3.y - p1.y) + 
                 p3.x * (p1.y - p2.y)) / 2
            );
        
        default:
            throw new Error("Invalid triangle data type");
    }
}

// Example usage
console.log(calculateTriangleArea({ type: 'baseHeight', base: 10, height: 5 })); // 25
console.log(calculateTriangleArea({ type: 'sides', a: 3, b: 4, c: 5 })); // 6
