function triangleAreaBaseHeight(base: number, height: number): number {
    return 0.5 * base * height;
}

// Example usage
const area = triangleAreaBaseHeight(10, 5); // Returns 25
function triangleAreaHeron(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // Semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage
const area = triangleAreaHeron(3, 4, 5); // Returns 6 (3-4-5 triangle)
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
const area = triangleAreaCoordinates(
    {x: 0, y: 0},
    {x: 4, y: 0},
    {x: 0, y: 3}
); // Returns 6
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
        return 0.5 * this.base * this.height;
    }

    // Method using three sides
    areaFromSides(): number {
        if (!this.sideA || !this.sideB || !this.sideC) {
            throw new Error("All three sides are required");
        }
        const s = (this.sideA + this.sideB + this.sideC) / 2;
        return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
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
