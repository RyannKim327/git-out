interface User {
  name: string;
  age: number;
  email: string;
}

class UserManager {
  private users: User[] = [];

  // Method to collect user input (simulated)
  public addUserFromInput(): void {
    const name: string = this.getInput("Enter your name: ");
    const age: number = parseInt(this.getInput("Enter your age: "));
    const email: string = this.getInput("Enter your email: ");

    const newUser: User = { name, age, email };
    
    if (this.validateUser(newUser)) {
      this.users.push(newUser);
      console.log("User added successfully!");
      this.displayUser(newUser);
    } else {
      console.log("Invalid user data. Please check your input.");
    }
  }

  // Simulated input function (would use readline in Node.js)
  private getInput(prompt: string): string {
    // In a real environment, you'd use:
    // const readline = require('readline').createInterface(...)
    // For demonstration, we'll simulate with Math.random()
    const simulatedInputs: string[] = ["Alice", "25", "alice@example.com"];
    console.log(prompt);
    return simulatedInputs[Math.floor(Math.random() * simulatedInputs.length)];
  }

  private validateUser(user: User): boolean {
    return (
      user.name.length > 0 &&
      user.age >= 0 &&
      user.email.includes('@')
    );
  }

  private displayUser(user: User): void {
    console.log(`
      User Details:
      Name: ${user.name}
      Age: ${user.age}
      Email: ${user.email}
    `);
  }

  public getAllUsers(): User[] {
    return this.users;
  }
}

// Usage example
const userManager = new UserManager();
userManager.addUserFromInput();

// In a real Node.js environment, you might use:
// import * as readline from 'readline';
// const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// rl.question('Input: ', (answer) => { ... });
