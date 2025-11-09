const myString: string = "HELLO WORLD";
const lowerCaseString: string = myString.toLowerCase();
console.log(lowerCaseString); // "hello world"
const myString: string = "İSTANBUL";
const lowerCaseString: string = myString.toLocaleLowerCase('tr-TR');
console.log(lowerCaseString); // "istanbul" (handles Turkish 'i' correctly)
const stringArray: string[] = ["APPLE", "BANANA", "CHERRY"];
const lowerCaseArray: string[] = stringArray.map(str => str.toLowerCase());
console.log(lowerCaseArray); // ["apple", "banana", "cherry"]
interface User {
  name: string;
  email: string;
}

const user: User = {
  name: "JOHN DOE",
  email: "JOHN@EXAMPLE.COM"
};

const normalizedUser: User = {
  name: user.name.toLowerCase(),
  email: user.email.toLowerCase()
};
const upperCase: string = "HELLO TYPESCRIPT";
const lowerCase: string = `${upperCase}`.toLowerCase();
console.log(lowerCase); // "hello typescript"
