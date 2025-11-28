const array = [1, 2, 3, 1, 2, 4];
const unique = Array.from(new Set(array));
console.log(unique); // [1, 2, 3, 4]
const unique = [...new Set(array)];
const array = [1, 2, 3, 1, 2, 4];
const unique = array.filter((item, index) => array.indexOf(item) === index);
console.log(unique); // [1, 2, 3, 4]
const array = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice" },
];

const unique = array.filter(
  (item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
);

console.log(unique); 
// [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
