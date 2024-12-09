import { input_a_mini as input_a } from "./input.js";
console.time("part A");
const inputStr = input_a();

const map = inputStr
  .split("")
  .map(Number)
  .reduce((m, i, ind) => {
    let val = ".";
    if (ind % 2 == 0) {
      val = ind / 2;
    }

    m.push(...Array(i).fill(val));
    return m;
  }, []);
let s = 0,
  e = map.length - 1;

while (s < e) {
  while (map[e] == ".") {
    e--;
  }

  if (map[s] == "." && s < e) {
    map[s] = map[e];
    map[e] = ".";
    e--;
  }
  s++;
}

const sum_a = map.reduce((sum, item, ind) => {
  if (item != ".") {
    sum += item * ind;
  }
  return sum;
}, 0);
const outputStr = map.join("");
console.log("A", sum_a, outputStr);

console.timeEnd("part A");
