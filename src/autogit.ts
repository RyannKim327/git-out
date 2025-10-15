function calculateTriangleArea(base: number, height: number): number {
    if (base <= 0 || height <= 0) {
        throw new Error('Base and height must be positive numbers');
    }
    return (base * height) / 2;
}

// Example usage
const area1 = calculateTriangleArea(5, 6); // Returns 15
console.log(`Area: ${area1}`); // Area: 15
function calculateTriangleAreaHeron(a: number, b: number, c: number): number {
    if (a <= 0 || b <= 0 || c <= 0) {
        throw new Error('All sides must be positive numbers');
    }
    
    // Check triangle inequality theorem
    if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error('Invalid triangle: sides do not satisfy triangle inequality');
    }
    
    const s = (a + b + c) / 2; // semi-perimeter
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    return area;
}

// Example usage
const area2 = calculateTriangleAreaHeron(3, 4, 5); // Returns 6
console.log(`Area: ${area2}`); // Area: 6
class Triangle {
    constructor(
        private base: number, 
        private height: number,
        private sideA?: number,
        private sideB?: number,
        private sideC?: number
    ) {
        if (base <= 0 || height <= 0) {
            throw new Error('Base and height must be positive');
        }
    }

    // Area using base and height
    area(): number {
        return (this.base * this.height) / 2;
    }

    // Area using Heron's formula if all sides are provided
    heronArea(): number {
        if (!this.sideA || !this.sideB || !this.sideC) {
            throw new Error('All three sides must be provided for Heron\'s formula');
        }

        const { sideA, sideB, sideC } = this;
        const s = (sideA + sideB + sideC) / 2;
        return Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
    }
}

// Usage
const triangle1 = new Triangle(10, 8);
console.log(triangle1.area()); // 40

const triangle2 = new Triangle(5, 12, 3, 4, 5);
console.log(triangle2.area()); // 30
console.log(triangle2.heronArea()); // 6
