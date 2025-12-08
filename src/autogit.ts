const str = "Hello, world!";
const search = "world";

if (str.includes(search)) {
  console.log("Found!");
} else {
  console.log("Not found.");
}
const str = "Hello, world!";
const search = "world";

if (str.indexOf(search) !== -1) {
  console.log("Found!");
}
const str = "Hello, world!";
const pattern = /world/i; // case-insensitive

if (pattern.test(str)) {
  console.log("Found via regex!");
}
