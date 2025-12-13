const str = 'hello world';
const needle = 'world';

if (str.includes(needle)) {
  console.log('found');
}
if (str.indexOf(needle) !== -1) {
  console.log('found');
}
const found = /world/i.test(str);   // i = ignore case
