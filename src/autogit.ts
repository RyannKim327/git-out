interface BaseHeightParams {
  base: number;
  height: number;
}

function areaFromBaseHeight({ base, height }: BaseHeightParams): number {
  if (base <= 0 || height <= 0) {
    throw new Error("Base and height must be positive numbers.");
  }
  return (base * height) / 2;
}

// Example usage:
const area = areaFromBaseHeight({ base: 5, height: 4 });
console.log(area); // Output: 10
interface ThreeSidesParams {
  sideA: number;
  sideB: number;
  sideC: number;
}

function areaFromThreeSides({ sideA, sideB, sideC }: ThreeSidesParams): number {
  if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
    throw new Error("All sides must be positive numbers.");
  }
  if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
    throw new Error("Invalid triangle: sides violate triangle inequality.");
  }

  const s = (sideA + sideB + sideC) / 2; // Semi-perimeter
  return Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
}

// Example usage:
const area = areaFromThreeSides({ sideA: 3, sideB: 4, sideC: 5 });
console.log(area); // Output: 6
interface SASParams {
  sideA: number;
  sideB: number;
  angleRad: number; // Angle in radians
}

function areaFromSAS({ sideA, sideB, angleRad }: SASParams): number {
  if (sideA <= 0 || sideB <= 0) {
    throw new Error("Sides must be positive numbers.");
  }
  return 0.5 * sideA * sideB * Math.sin(angleRad);
}

// Example usage (60 degrees = π/3 radians):
const angleRad = Math.PI / 3; // Convert 60 degrees to radians
const area = areaFromSAS({ sideA: 5, sideB: 6, angleRad });
console.log(area.toFixed(2)); // Output: ~12.99
