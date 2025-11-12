function areaFromBaseHeight(base: number, height: number): number {
    return 0.5 * base * height;
}

// Usage
const area = areaFromBaseHeight(10, 5);
console.log(area); // 25
function areaFromThreeSides(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
}

// Usage
const area = areaFromThreeSides(5, 6, 7);
console.log(area); // ~14.70
function areaFromTwoSidesAndAngle(side1: number, side2: number, angleDegrees: number): number {
    const angleRadians = angleDegrees * Math.PI / 180;
    return 0.5 * side1 * side2 * Math.sin(angleRadians);
}

// Usage
const area = areaFromTwoSidesAndAngle(5, 8, 30);
console.log(area); // ~10
enum TriangleMethod {
    BASE_HEIGHT = "base_height",
    THREE_SIDES = "three_sides",
    TWO_SIDES_ANGLE = "two_sides_angle"
}

function calculateTriangleArea(
    method: TriangleMethod,
    values: {
        base?: number;
        height?: number;
        side1?: number;
        side2?: number;
        side3?: number;
        angle?: number;
    }
): number {
    // Input validation
    const validatePositive = (num: number, name: string): void => {
        if (num <= 0) {
            throw new Error(`${name} must be positive`);
        }
    };

    try {
        switch (method) {
            case TriangleMethod.BASE_HEIGHT:
                if (values.base === undefined || values.height === undefined) {
                    throw new Error("Base and height are required");
                }
                validatePositive(values.base, "Base");
                validatePositive(values.height, "Height");
                return 0.5 * values.base * values.height;

            case TriangleMethod.THREE_SIDES:
                if (values.side1 === undefined || values.side2 === undefined || values.side3 === undefined) {
                    throw new Error("All three sides are required");
                }
                validatePositive(values.side1, "Side 1");
                validatePositive(values.side2, "Side 2");
                validatePositive(values.side3, "Side 3");
                
                // Triangle inequality check
                if (values.side1 + values.side2 <= values.side3 ||
                    values.side1 + values.side3 <= values.side2 ||
                    values.side2 + values.side3 <= values.side1) {
                    throw new Error("Invalid triangle: sides do not satisfy triangle inequality");
                }
                
                const s = (values.side1 + values.side2 + values.side3) / 2;
                return Math.sqrt(s * (s - values.side1) * (s - values.side2) * (s - values.side3));

            case TriangleMethod.TWO_SIDES_ANGLE:
                if (values.side1 === undefined || values.side2 === undefined || values.angle === undefined) {
                    throw new Error("Two sides and included angle are required");
                }
                validatePositive(values.side1, "Side 1");
                validatePositive(values.side2, "Side 2");
                
                if (values.angle <= 0 || values.angle >= 180) {
                    throw new Error("Angle must be between 0 and 180 degrees");
                }
                
                const angleRadians = values.angle * Math.PI / 180;
                return 0.5 * values.side1 * values.side2 * Math.sin(angleRadians);

            default:
                throw new Error("Invalid method");
        }
    } catch (error) {
        console.error("Error calculating triangle area:", error);
        throw error;
    }
}

// Usage examples
try {
    // Base and height
    const area1 = calculateTriangleArea(TriangleMethod.BASE_HEIGHT, {
        base: 10,
        height: 5
    });
    console.log(`Area from base and height: ${area1}`);

    // Three sides
    const area2 = calculateTriangleArea(TriangleMethod.THREE_SIDES, {
        side1: 5,
        side2: 6,
        side3: 7
    });
    console.log(`Area from three sides: ${area2}`);

    // Two sides and included angle
    const area3 = calculateTriangleArea(TriangleMethod.TWO_SIDES_ANGLE, {
        side1: 5,
        side2: 8,
        angle: 30
    });
    console.log(`Area from two sides and angle: ${area3}`);
} catch (error) {
    console.error("Calculation failed:", error);
}
