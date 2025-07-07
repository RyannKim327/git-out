const mainString = "Hello, world!";
const substring = "world";

if (mainString.includes(substring)) {
  console.log("The string contains the substring.");
} else {
  console.log("The string does not contain the substring.");
}
if (mainString.toLowerCase().includes(substring.toLowerCase())) {
  // Do something
}
if (mainString.indexOf(substring) !== -1) {
  // substring is found
}
