const text = 'Hello, world!';
const needle = 'world';

if (text.includes(needle)) {
  console.log('Found!');
}
if (text.indexOf(needle) !== -1) {
  console.log('Found!');
}
const found = /world/i.test(text);   // i = ignore case
console.log(found);
