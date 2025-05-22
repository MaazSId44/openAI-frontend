const listA = [1, 2, 3, 4];
const listB = [2, 3, 4, 1, 3];
const listC = [2, 3, 4, 1, 3];
const numbers = [1, 2, 3, 2, 3, 3, 4, 5, 4];

const data = [
  {
    name: "Rizwan",
    age: 30,
  },
  {
    name: "Maaz",
    age: 27,
  },
  {
    name: "Bilal",
    age: 31,
  },
  {
    name: "Sabir",
    age: 26,
  },
];

const ageAbovetihrty = data.filter((item) => {
 return item.age > 30;
});

console.log('ageAbovetihrty,', ageAbovetihrty);
