/**
 * Calculates the area of a triangle given its base and height.
 * @param base The length of the base of the triangle.
 * @param height The perpendicular height to that base.
 * @returns The area of the triangle.
 * @throws Error if base or height are non-positive.
 */
function calculateAreaBaseHeight(base: number, height: number): number {
    if (base <= 0 || height <= 0) {
        throw new Error("Base and height must be positive numbers.");
    }
    return (base * height) / 2;
}

// --- Usage ---
console.log("--- Base and Height Method ---");
try {
    const area1 = calculateAreaBaseHeight(10, 5); // base = 10, height = 5
    console.log(`Area (base=10, height=5): ${area1}`); // Expected: 25

    const area2 = calculateAreaBaseHeight(7.5, 3.2);
    console.log(`Area (base=7.5, height=3.2): ${area2}`); // Expected: 12

    // console.log(calculateAreaBaseHeight(-5, 10)); // This would throw an error
} catch (error: any) {
    console.error(error.message);
}
console.log("\n");
/**
 * Calculates the area of a triangle given its three side lengths using Heron's formula.
 * @param a Length of the first side.
 * @param b Length of the second side.
 * @param c Length of the third side.
 * @returns The area of the triangle.
 * @throws Error if any side length is non-positive or if the sides do not form a valid triangle.
 */
function calculateAreaHerons(a: number, b: number, c: number): number {
    if (a <= 0 || b <= 0 || c <= 0) {
        throw new Error("Side lengths must be positive numbers.");
    }

    // Triangle Inequality Theorem: The sum of the lengths of any two sides of a triangle
    // must be greater than the length of the third side.
    if (!(a + b > c && a + c > b && b + c > a)) {
        throw new Error("The given side lengths do not form a valid triangle.");
    }

    const s = (a + b + c) / 2; // Semi-perimeter
    const areaSquared = s * (s - a) * (s - b) * (s - c);

    // Due to floating point inaccuracies, areaSquared might be very slightly negative
    // for degenerate triangles or near-degenerate ones. Math.max(0, ...) handles this.
    return Math.sqrt(Math.max(0, areaSquared));
}

// --- Usage ---
console.log("--- Heron's Formula (Three Sides) ---");
try {
    const area3 = calculateAreaHerons(3, 4, 5); // A common right-angled triangle
    console.log(`Area (sides 3, 4, 5): ${area3}`); // Expected: 6

    const area4 = calculateAreaHerons(7, 8, 9);
    console.log(`Area (sides 7, 8, 9): ${area4}`); // Expected: approx 26.83

    // console.log(calculateAreaHerons(1, 2, 5)); // This would throw an error (not a valid triangle)
} catch (error: any) {
    console.error(error.message);
}
console.log("\n");
interface Point {
    x: number;
    y: number;
}

/**
 * Calculates the area of a triangle given the coordinates of its three vertices.
 * Uses the Shoelace formula (or determinant formula).
 * @param p1 The first vertex (Point object).
 * @param p2 The second vertex (Point object).
 * @param p3 The third vertex (Point object).
 * @returns The area of the triangle. Returns 0 if the points are collinear (degenerate triangle).
 */
function calculateAreaCoordinates(p1: Point, p2: Point, p3: Point): number {
    // The formula automatically handles positive/negative area based on vertex order,
    // so we take the absolute value.
    const area = 0.5 * Math.abs(
        p1.x * (p2.y - p3.y) +
        p2.x * (p3.y - p1.y) +
        p3.x * (p1.y - p2.y)
    );
    return area;
}

// --- Usage ---
console.log("--- Coordinates of Vertices Method ---");
const pA: Point = { x: 0, y: 0 };
const pB: Point = { x: 4, y: 0 };
const pC: Point = { x: 0, y: 3 };
const area5 = calculateAreaCoordinates(pA, pB, pC); // A right-angled triangle (base 4, height 3)
console.log(`Area (0,0), (4,0), (0,3): ${area5}`); // Expected: 6

const pD: Point = { x: 1, y: 1 };
const pE: Point = { x: 5, y: 2 };
const pF: Point = { x: 3, y: 6 };
const area6 = calculateAreaCoordinates(pD, pE, pF);
console.log(`Area (1,1), (5,2), (3,6): ${area6}`); // Expected: 10

const pG: Point = { x: 1, y: 1 };
const pH: Point = { x: 2, y: 2 };
const pI: Point = { x: 3, y: 3 }; // Collinear points, degenerate triangle
const area7 = calculateAreaCoordinates(pG, pH, pI);
console.log(`Area (1,1), (2,2), (3,3) (collinear): ${area7}`); // Expected: 0
console.log("\n");
/**
 * Converts an angle from degrees to radians.
 * @param degrees The angle in degrees.
 * @returns The angle in radians.
 */
function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

/**
 * Calculates the area of a triangle given two side lengths and the included angle.
 * @param side1 The length of the first side.
 * @param side2 The length of the second side.
 * @param angleDegrees The angle between side1 and side2, in degrees.
 * @returns The area of the triangle.
 * @throws Error if side lengths are non-positive or angle is outside (0, 180) exclusive.
 */
function calculateAreaSAS(side1: number, side2: number, angleDegrees: number): number {
    if (side1 <= 0 || side2 <= 0) {
        throw new Error("Side lengths must be positive numbers.");
    }
    // An angle of 0 or 180 degrees would result in a degenerate triangle (area 0),
    // but typically we expect a proper triangle.
    if (angleDegrees <= 0 || angleDegrees >= 180) {
        throw new Error("Angle must be strictly between 0 and 180 degrees.");
    }

    const angleRadians = degreesToRadians(angleDegrees);
    return 0.5 * side1 * side2 * Math.sin(angleRadians);
}

// --- Usage ---
console.log("--- Two Sides and Included Angle (SAS) Method ---");
try {
    const area8 = calculateAreaSAS(10, 5, 30); // side1=10, side2=5, angle=30 degrees
    console.log(`Area (sides 10, 5, angle 30°): ${area8}`); // Expected: 12.5

    const area9 = calculateAreaSAS(6, 8, 90); // Right-angled triangle (base 6, height 8)
    console.log(`Area (sides 6, 8, angle 90°): ${area9}`); // Expected: 24 (0.5 * 6 * 8 * sin(90) = 0.5 * 6 * 8 * 1)

    // console.log(calculateAreaSAS(7, 4, 180)); // This would throw an error
} catch (error: any) {
    console.error(error.message);
}
console.log("\n");
