// randomPassword.ts
import * as readline from 'readline';

// Characters that can appear in the password
const CHARSET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

function generatePassword(length: number): string {
  let pwd = '';
  for (let i = 0; i < length; i++) {
    pwd += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return pwd;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter desired password length: ', (answer) => {
  const len = parseInt(answer, 10);
  if (!isNaN(len) && len > 0) {
    console.log(`Generated password: ${generatePassword(len)}`);
  } else {
    console.log('Please enter a valid positive integer.');
  }
  rl.close();
});
# 1. Compile (requires TypeScript installed)
tsc randomPassword.ts

# 2. Execute the resulting JavaScript
node randomPassword.js
