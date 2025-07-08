const myString: string = "Hello World!";
const lowerCaseString: string = myString.toLowerCase();

console.log(lowerCaseString); // Output: "hello world!"
const myString: string = "İstanbul";
const lowerCaseLocaleString: string = myString.toLocaleLowerCase('tr');

console.log(lowerCaseLocaleString); // Output might vary based on the locale
