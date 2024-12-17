import { input_a_mini as input_a } from "./input.js";
console.time("part A");
const start = [0, 0];
const [m, w] = input_a().split("\n\n");
const map = m.split("\n").map((i, row) =>
  i.split("").map((ii, col) => {
    if (ii == "@") {
      start[0] = row;
      start[1] = col;
    }
  })
);

const steps = w.split("\n").join("").split("");
const directions = {
  "^": [-1, 0],
  ">": [0, 1],
  v: [1, 0],
  "<": [-0, 1],
};

for (let i = 0; i < steps.length; i++) {
  calcStep(steps[i]);
}

function calcStep(step) {

  
  const x = directions[step][0]

  const nextPoint = 
  //
}

console.log("A", 0);
console.timeEnd("part A");
