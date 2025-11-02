function triangleAreaBaseHeight(base: number, height: number): number {
    return 0.5 * base * height;
}

// Example usage
const area1 = triangleAreaBaseHeight(10, 5); // 25
function triangleAreaHeron(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Example usage
const area2 = triangleAreaHeron(3, 4, 5); // 6
function triangleAreaCoordinates(
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number
): number {
    return Math.abs((x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)) / 2);
}

// Example usage
const area3 = triangleAreaCoordinates(0, 0, 4, 0, 0, 3); // 6
function triangleAreaSidesAngle(a: number, b: number, angle: number): number {
    // Angle should be in radians
    return 0.5 * a * b * Math.sin(angle);
}

// Example usage
const area4 = triangleAreaSidesAngle(5, 6, Math.PI / 2); // 15
class TriangleCalculator {
    // Base and height
    static areaBaseHeight(base: number, height: number): number {
        return 0.5 * base * height;
    }
    
    // Heron's formula
    static areaHeron(a: number, b: number, c: number): number {
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle sides: sum of any two sides must be greater than the third");
        }
        
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
    
    // Coordinates
    static areaCoordinates(
        x1: number, y1: number,
        x2: number, y2: number,
        x3: number, y3: number
    ): number {
        return Math.abs((x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)) / 2);
    }
    
    // Two sides and included angle
    static areaSidesAngle(a: number, b: number, angleRadians: number): number {
        return 0.5 * a * b * Math.sin(angleRadians);
    }
}

// Example usage
console.log(TriangleCalculator.areaBaseHeight(10, 5)); // 25
console.log(TriangleCalculator.areaHeron(3, 4, 5)); // 6
console.log(TriangleCalculator.areaCoordinates(0, 0, 4, 0, 0, 3)); // 6
console.log(TriangleCalculator.areaSidesAngle(5, 6, Math.PI / 2)); // 15
type TriangleMethod = 'baseHeight' | 'heron' | 'coordinates' | 'sidesAngle';

function calculateTriangleArea(
    method: TriangleMethod,
    ...args: number[]
): number {
    switch (method) {
        case 'baseHeight':
            if (args.length !== 2) throw new Error("Base and height method requires 2 arguments");
            return 0.5 * args[0] * args[1];
            
        case 'heron':
            if (args.length !== 3) throw new Error("Heron's formula requires 3 arguments");
            const [a, b, c] = args;
            if (a + b <= c || a + c <= b || b + c <= a) {
                throw new Error("Invalid triangle sides");
            }
            const s = (a + b + c) / 2;
            return Math.sqrt(s * (s - a) * (s - b) * (s - c));
            
        case 'coordinates':
            if (args.length !== 6) throw new Error("Coordinates method requires 6 arguments");
            const [x1, y1, x2, y2, x3, y3] = args;
            return Math.abs((x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)) / 2);
            
        case 'sidesAngle':
            if (args.length !== 3) throw new Error("Sides and angle method requires 3 arguments");
            return 0.5 * args[0] * args[1] * Math.sin(args[2]);
            
        default:
            throw new Error("Invalid method");
    }
}

// Example usage
const area1 = calculateTriangleArea('baseHeight', 10, 5); // 25
const area2 = calculateTriangleArea('heron', 3, 4, 5); // 6
