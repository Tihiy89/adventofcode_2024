import { input_a as input_a } from "./input.js";

const m1 = [];
const m2 = [];
const o_identity = {};
input_a()
  .split("\n")
  .map((i) => {
    const [i1, i2] = i
      .replaceAll(/ +/g, " ")
      .split(" ")
      .map((i) => Number(i));
    m1.push(i1);
    m2.push(i2);
    o_identity[i2] = (o_identity[i2] ?? 0) + 1;
  });

m1.sort((b, a) => b - a);
m2.sort((b, a) => b - a);
let distance = 0;
let sum_identity = 0;

for (let i = 0; i < m1.length; i++) {
  distance += Math.abs(m1[i] - m2[i]);
  sum_identity += m1[i] * (o_identity[m1[i]] ?? 0);
}

console.log("distance =", distance);
console.log("identity =", sum_identity);
