import * as readline from 'readline';

// Define interface for user data
interface UserInfo {
    name: string;
    age: number;
    email?: string; // Optional property
}

// Create readline interface for input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
};

// Main function to collect and process user input
const getUserInfo = async (): Promise<UserInfo> => {
    const name = await askQuestion('Enter your name: ');
    
    let age: number;
    while (isNaN(age)) {
        const ageInput = await askQuestion('Enter your age: ');
        age = parseInt(ageInput, 10);
        if (isNaN(age)) {
            console.log('Please enter a valid number for age!');
        }
    }
    
    const email = await askQuestion('Enter your email (optional): ');

    // Return typed object
    return {
        name,
        age,
        ...(email && { email }) // Only add email if provided
    };
};

// Run the program
(async () => {
    try {
        console.log('--- User Information Collector ---');
        const userInfo = await getUserInfo();
        console.log('\nCollected Information:');
        console.log(`Name: ${userInfo.name}`);
        console.log(`Age: ${userInfo.age}`);
        if (userInfo.email) {
            console.log(`Email: ${userInfo.email}`);
        }

        // Example of type checking
        if (userInfo.age >= 18) {
            console.log('You are an adult.');
        } else {
            console.log('You are a minor.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        rl.close();
    }
})();
--- User Information Collector ---
Enter your name: Alice
Enter your age: twenty
Please enter a valid number for age!
Enter your age: 25
Enter your email (optional): alice@example.com

Collected Information:
Name: Alice
Age: 25
Email: alice@example.com
You are an adult.
