function greet(name: string, title: string): string {
  return "Hello, " + title + " " + name + "!";
}

// Usage
const message = greet("Doe", "Dr.");
// → "Hello, Dr. Doe!"
function greet(name: string, title: string): string {
  return `Hello, ${title} ${name}!`;
}

// Usage
const message = greet("Doe", "Dr.");
// → "Hello, Dr. Doe!"
const first = "Hello, ";
const second = "world!";
const combined = first.concat(second); // "Hello, world!"
/**
 * Concatenates any number of strings.
 * @param parts - The strings (or values that can be coerced to strings) to join.
 * @returns A single combined string.
 */
function joinStrings(...parts: (string | number | boolean)[]): string {
  return parts.map(String).join('');
}

// Example usage:
const url = joinStrings('https://api.example.com/', 'v1/', 'users/', 42);
// → "https://api.example.com/v1/users/42"
// 1. + operator
const s1 = "Hello, " + "world!";

// 2. Template literal
const name = "Alice";
const greeting = `Hi, ${name}!`;

// 3. concat()
const s2 = "foo".concat("bar");

// 4. Helper for many parts
function join(...parts: string[]): string {
  return parts.join('');
}
const url = join("https://", "example.com/", "api");
