const originalString: string = "Hello World!";
const lowerCaseString: string = originalString.toLowerCase();
console.log(lowerCaseString); // Output: "hello world!"
// Standard lowercase conversion
const lower = myString.toLowerCase();

// With null/undefined guard
const lowerSafe = (myString || "").toLowerCase();
