import { input_a as input_a } from "./input.js";

let data = input_a();

const regexp = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;

const exp = data.match(regexp);

const sum_a = exp.reduce((sum, item) => {
  const [a, b] = item.match(/[0-9]{1,3}/g);
  sum += a * b;
  return sum;
}, 0);

const regexp_b = /mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g;
const exp_b = data.match(regexp_b);
let enable = true;
const sum_b = exp_b.reduce((sum, item) => {
  if (item == "don't()") {
    enable = false;
  } else if (item == "do()") {
    enable = true;
  } else if (enable) {
    const [a, b] = item.match(/[0-9]{1,3}/g);
    sum += a * b;
  }
  return sum;
}, 0);

console.log("A", sum_a);
console.log("B", sum_b);
