// Define interface for user input
interface UserInput {
  name: string;
  age: number;
  email: string;
}

// Function to process user input with validation
function processUserInput(input: UserInput): { success: boolean; message: string; data?: UserInput } {
  // Input validation
  if (!input.name || input.name.trim().length === 0) {
    return { success: false, message: "Name is required" };
  }

  if (!input.email || !input.email.includes('@')) {
    return { success: false, message: "Valid email is required" };
  }

  if (input.age < 0 || input.age > 150) {
    return { success: false, message: "Age must be between 0 and 150" };
  }

  // Simulate processing
  const processedData: UserInput = {
    name: input.name.trim().toUpperCase(),
    age: input.age,
    email: input.email.toLowerCase()
  };

  return {
    success: true,
    message: "Input processed successfully",
    data: processedData
  };
}

// Example usage
const userData: UserInput = {
  name: "  John Doe  ",
  age: 25,
  email: "JOHN@example.com"
};

console.log("Input:", userData);
const result = processUserInput(userData);
console.log("Result:", result);

// Function to handle command line input
function handleCLIInput(args: string[]): void {
  if (args.length < 3) {
    console.log("Usage: node script.js <name> <age> <email>");
    return;
  }

  const input: UserInput = {
    name: args[0],
    age: parseInt(args[1]),
    email: args[2]
  };

  const result = processUserInput(input);
  console.log(result);
}

// For Node.js command line input
if (require.main === module) {
  handleCLIInput(process.argv.slice(2));
}

// Async function to simulate API input processing
async function processApiInput(input: UserInput): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = processUserInput(input);
      resolve(result);
    }, 1000);
  });
}

// Example with async/await
async function exampleAsyncProcessing() {
  const apiInput: UserInput = {
    name: "Alice",
    age: 30,
    email: "alice@company.com"
  };

  console.log("Processing API input...");
  const result = await processApiInput(apiInput);
  console.log("API Result:", result);
}

// Run the async example
exampleAsyncProcessing();
# Compile TypeScript
tsc script.ts

# Run with command line arguments
node script.js "Jane Smith" 28 "jane@email.com"
