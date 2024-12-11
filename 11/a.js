import { input_a as input_a } from "./input.js";
console.time("part A");

const COUNT_STEP = 75;

let input = input_a().split(" ").map(Number);

function blink(inp) {
  const out = inp.reduce((res, i) => {
    if (i == 0) {
      res.push(1);
    } else if (("" + i).length % 2 == 0) {
      const num = "" + i;

      res.push(
        Number(num.slice(0, num.length / 2)),
        Number(num.slice(num.length / 2))
      );
    } else {
      res.push(i * 2024);
    }
    return res;
  }, []);

  return out;
}

for (let step = 0; step < COUNT_STEP; step++) {
  console.log(`step ${step}/${COUNT_STEP}`);
  input = blink(input);
}

console.log("A", input.length);

console.timeEnd("part A");
