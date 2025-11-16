const str = 'Hello world';
const needle = 'world';

if (str.includes(needle)) {
  console.log('Found!');
}
if (str.indexOf(needle) !== -1) {
  console.log('Found!');
}
const found = /world/i.test(str);   // i = ignore case
