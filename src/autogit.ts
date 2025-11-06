// Random utility functions with input handling
interface User {
  name: string;
  age: number;
  email: string;
}

class InputProcessor {
  private users: User[] = [];

  // Function to process user input and create a user
  processUserInput(name: string, ageInput: string, email: string): User | null {
    try {
      // Input validation
      if (!name || name.trim().length === 0) {
        throw new Error("Name cannot be empty");
      }

      if (!email.includes('@')) {
        throw new Error("Invalid email format");
      }

      const age = parseInt(ageInput);
      if (isNaN(age) || age < 0 || age > 150) {
        throw new Error("Age must be a valid number between 0 and 150");
      }

      const user: User = {
        name: name.trim(),
        age: age,
        email: email.toLowerCase().trim()
      };

      this.users.push(user);
      return user;
    } catch (error) {
      console.error("Error processing input:", error instanceof Error ? error.message : "Unknown error");
      return null;
    }
  }

  // Function to filter users by age range
  filterUsersByAge(minAge: number, maxAge: number): User[] {
    return this.users.filter(user => user.age >= minAge && user.age <= maxAge);
  }

  // Function to process multiple inputs at once
  processMultipleInputs(inputs: { name: string; age: string; email: string }[]): User[] {
    const validUsers: User[] = [];
    
    inputs.forEach(input => {
      const user = this.processUserInput(input.name, input.age, input.email);
      if (user) {
        validUsers.push(user);
      }
    });
    
    return validUsers;
  }
}

// Example usage with different types of input
function demonstrateInputProcessing(): void {
  const processor = new InputProcessor();

  // Single user input
  console.log("=== Processing Single User Input ===");
  const user1 = processor.processUserInput("John Doe", "25", "john@example.com");
  if (user1) {
    console.log("User created:", user1);
  }

  // Multiple users input
  console.log("\n=== Processing Multiple Users Input ===");
  const userInputs = [
    { name: "Alice Smith", age: "30", email: "alice@example.com" },
    { name: "Bob Johnson", age: "invalid", email: "bob@example.com" }, // Invalid age
    { name: "", age: "35", email: "charlie@example.com" }, // Empty name
    { name: "Diana Prince", age: "28", email: "diana@example.com" }
  ];

  const validUsers = processor.processMultipleInputs(userInputs);
  console.log(`Successfully processed ${validUsers.length} users`);

  // Filter users
  console.log("\n=== Filtering Users (Age 25-35) ===");
  const filteredUsers = processor.filterUsersByAge(25, 35);
  console.log("Filtered users:", filteredUsers);

  // Command line input simulation (if running in Node.js)
  console.log("\n=== Simulating Command Line Input ===");
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('Enter your name: ', (name: string) => {
    readline.question('Enter your age: ', (age: string) => {
      readline.question('Enter your email: ', (email: string) => {
        const interactiveUser = processor.processUserInput(name, age, email);
        if (interactiveUser) {
          console.log("Interactive user created:", interactiveUser);
        }
        readline.close();
      });
    });
  });
}

// Run the demonstration
demonstrateInputProcessing();

// Additional utility function for string input manipulation
function processStringInput(input: string): { 
  reversed: string; 
  wordCount: number; 
  isPalindrome: boolean 
} {
  const trimmed = input.trim();
  const reversed = trimmed.split('').reverse().join('');
  const words = trimmed.split(/\s+/).filter(word => word.length > 0);
  
  return {
    reversed,
    wordCount: words.length,
    isPalindrome: trimmed.toLowerCase() === reversed.toLowerCase() && trimmed.length > 0
  };
}

// Example of string input processing
console.log("\n=== String Input Processing ===");
const textInput = "A man a plan a canal Panama";
const processedText = processStringInput(textInput);
console.log(`Input: "${textInput}"`);
console.log(`Reversed: "${processedText.reversed}"`);
console.log(`Word count: ${processedText.wordCount}`);
console.log(`Is palindrome: ${processedText.isPalindrome}`);
