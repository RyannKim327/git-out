let fruits = ["apple", "banana", "cherry"];
fruits = fruits.filter(fruit => fruit !== "banana");
const indexToRemove = 1; // "banana" is at index 1
fruits.splice(indexToRemove, 1);
