const haystack = 'hello world';
const needle   = 'world';

const contains = haystack.includes(needle); // true
const containsIgnoreCase =
  haystack.toLowerCase().includes(needle.toLowerCase());
const contains = haystack.indexOf(needle) !== -1;
