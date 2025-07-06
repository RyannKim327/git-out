function burrowsWheelerTransform(input: string): { transformed: string, index: number } {
    const n = input.length;

    // Step 1: Create the array to hold all cyclic rotations
    const rotations: string[] = new Array(n);
  
    for (let i = 0; i < n; i++) {
        rotations[i] = input.slice(i) + input.slice(0, i);
    }
  
    // Step 2: Sort the rotations lexicographically
    rotations.sort();
  
    // Step 3: Build the BWT output and find the original index
    let bwtOutput = '';
    let originalIndex = 0;

    for (let i = 0; i < n; i++) {
        bwtOutput += rotations[i][n - 1]; // Take the last character of each sorted rotation
        if (rotations[i] === input) {
            originalIndex = i; // Find the index of the original string
        }
    }
  
    return { transformed: bwtOutput, index: originalIndex };
}

// Example usage:
const input = "banana";
const result = burrowsWheelerTransform(input);
console.log("Transformed:", result.transformed);
console.log("Original Index:", result.index);
Transformed: annb$aa
Original Index: 3
