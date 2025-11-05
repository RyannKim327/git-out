function triangleArea(base: number, height: number): number {
    return 0.5 * base * height;
}

// Example usage
const area = triangleArea(10, 5); // 25
console.log(`Area: ${area}`);
function triangleAreaHeron(a: number, b: number, c: number): number {
    const semiperimeter = (a + b + c) / 2;
    return Math.sqrt(semiperimeter * (semiperimeter - a) * (semiperimeter - b) * (semiperimeter - c));
}

// Example usage
const area = triangleAreaHeron(3, 4, 5); // 6
console.log(`Area: ${area}`);
function triangleAreaWithAngle(side1: number, side2: number, angleDegrees: number): number {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    return 0.5 * side1 * side2 * Math.sin(angleRadians);
}

// Example usage
const area = triangleAreaWithAngle(5, 7, 30); // ~8.75
console.log(`Area: ${area}`);
class Triangle {
    constructor(
        public base: number,
        public height: number
    ) {}

    getArea(): number {
        return 0.5 * this.base * this.height;
    }
}

// Example usage
const triangle = new Triangle(8, 6);
console.log(`Area: ${triangle.getArea()}`); // 24
function validateAndCalculateArea(base: number, height: number): number | string {
    if (base <= 0 || height <= 0) {
        return "Base and height must be positive numbers";
    }
    
    if (!Number.isFinite(base) || !Number.isFinite(height)) {
        return "Base and height must be finite numbers";
    }
    
    return 0.5 * base * height;
}

// Example usage
console.log(validateAndCalculateArea(10, 5)); // 25
console.log(validateAndCalculateArea(-10, 5)); // "Base and height must be positive numbers"
interface TriangleDimensions {
    base?: number;
    height?: number;
    side1?: number;
    side2?: number;
    side3?: number;
    angle?: number;
}

function calculateArea(dimensions: TriangleDimensions): number {
    // Method 1: Base and height
    if (dimensions.base && dimensions.height) {
        return 0.5 * dimensions.base * dimensions.height;
    }
    
    // Method 2: Three sides (Heron's formula)
    if (dimensions.side1 && dimensions.side2 && dimensions.side3) {
        const s = (dimensions.side1 + dimensions.side2 + dimensions.side3) / 2;
        return Math.sqrt(s * (s - dimensions.side1) * (s - dimensions.side2) * (s - dimensions.side3));
    }
    
    // Method 3: Two sides and included angle
    if (dimensions.side1 && dimensions.side2 && dimensions.angle) {
        const angleRad = (dimensions.angle * Math.PI) / 180;
        return 0.5 * dimensions.side1 * dimensions.side2 * Math.sin(angleRad);
    }
    
    throw new Error("Insufficient dimensions to calculate triangle area");
}

// Example usage
console.log(calculateArea({ base: 10, height: 5 })); // 25
console.log(calculateArea({ side1: 3, side2: 4, side3: 5 })); // 6
console.log(calculateArea({ side1: 5, side2: 7, angle: 30 })); // ~8.75
