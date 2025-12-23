import * as readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to get user input
function getUserInput(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer);
    });
  });
}

// Main function
async function main() {
  try {
    const name = await getUserInput('Enter your name: ');
    const age = await getUserInput('Enter your age: ');
    const email = await getUserInput('Enter your email: ');
    
    console.log('\n--- User Information ---');
    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
    console.log(`Email: ${email}`);
    
    rl.close();
  } catch (error) {
    console.error('Error reading input:', error);
  }
}

main();
// Define interface for form data
interface UserFormData {
  username: string;
  email: string;
  age: number;
  subscription: boolean;
}

// Function to handle form submission
function handleFormSubmit(event: Event): void {
  event.preventDefault();
  
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  
  const userData: UserFormData = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    age: parseInt(formData.get('age') as string),
    subscription: formData.get('subscription') === 'on'
  };
  
  validateAndProcessInput(userData);
}

// Validate and process the input
function validateAndProcessInput(data: UserFormData): void {
  // Validation
  if (data.username.length < 3) {
    alert('Username must be at least 3 characters long');
    return;
  }
  
  if (data.age < 0 || data.age > 150) {
    alert('Please enter a valid age');
    return;
  }
  
  // Process the data
  console.log('Form submitted successfully!');
  console.log('User Data:', data);
  
  // You could send this to an API, store it, etc.
  sendToAPI(data);
}

// Simulate API call
async function sendToAPI(data: UserFormData): Promise<void> {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      console.log('Data sent to API successfully');
    }
  } catch (error) {
    console.error('Error sending data to API:', error);
  }
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm') as HTMLFormElement;
  form.addEventListener('submit', handleFormSubmit);
});
// Process command line arguments
interface Config {
  inputFile: string;
  outputFile: string;
  verbose: boolean;
  count: number;
}

function parseArguments(args: string[]): Config {
  const config: Config = {
    inputFile: '',
    outputFile: '',
    verbose: false,
    count: 1
  };
  
  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '-i':
      case '--input':
        config.inputFile = args[++i];
        break;
      case '-o':
      case '--output':
        config.outputFile = args[++i];
        break;
      case '-v':
      case '--verbose':
        config.verbose = true;
        break;
      case '-c':
      case '--count':
        config.count = parseInt(args[++i]);
        break;
      case '-h':
      case '--help':
        showHelp();
        process.exit(0);
      default:
        console.warn(`Unknown argument: ${arg}`);
    }
  }
  
  return config;
}

function showHelp(): void {
  console.log(`
Usage: ts-node script.ts [options]
Options:
  -i, --input <file>    Input file path
  -o, --output <file>   Output file path
  -v, --verbose         Enable verbose mode
  -c, --count <number>  Number of iterations
  -h, --help            Show this help message
  `);
}

function processInput(config: Config): void {
  if (config.verbose) {
    console.log('Processing with configuration:', config);
  }
  
  // Simulate processing
  for (let i = 0; i < config.count; i++) {
    console.log(`Processing iteration ${i + 1}`);
    // Process the input file here
  }
  
  console.log(`Input file: ${config.inputFile}`);
  console.log(`Output file: ${config.outputFile}`);
}

// Main execution
const config = parseArguments(process.argv);
processInput(config);
// Generic input handler with strong typing
class InputHandler<T> {
  private validators: ((value: T) => boolean | string)[] = [];
  
  addValidator(validator: (value: T) => boolean | string): this {
    this.validators.push(validator);
    return this;
  }
  
  validate(value: T): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    for (const validator of this.validators) {
      const result = validator(value);
      if (result !== true) {
        errors.push(result as string);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Example usage with user registration
interface RegistrationData {
  username: string;
  password: string;
  email: string;
  age: number;
}

const registrationHandler = new InputHandler<RegistrationData>();

// Add validators
registrationHandler
  .addValidator((data) => data.username.length >= 3 || 'Username too short')
  .addValidator((data) => data.password.length >= 8 || 'Password too weak')
  .addValidator((data) => data.email.includes('@') || 'Invalid email')
  .addValidator((data) => data.age >= 18 || 'Must be 18 or older');

// Test the validation
const testData: RegistrationData = {
  username: 'john',
  password: 'weakpass',
  email: 'invalid-email',
  age: 16
};

const result = registrationHandler.validate(testData);
console.log('Validation result:', result);

// Process valid data
if (result.isValid) {
  console.log('Registration successful!');
  // Process registration...
} else {
  console.log('Registration failed. Errors:', result.errors);
}
